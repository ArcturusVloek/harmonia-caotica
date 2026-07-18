#!/usr/bin/env python3
"""Consolida CSS e JavaScript para reduzir o tempo de carregamento.

Preserva o conteúdo canônico e a ordem efetiva da cascata. O script gera dois
conjuntos de recursos: páginas gerais e páginas de Sistemas.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_ROOTS = ("divindades", "dominios", "territorios", "mundo", "sistemas", "templates")
VERSION = "20260718b"
FONT_URL = (
    "https://fonts.googleapis.com/css2?"
    "family=Cormorant+Garamond:wght@500;600;700&"
    "family=Inter:wght@400;500;600;700&"
    "family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
)


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, content: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content.rstrip() + "\n", encoding="utf-8")


def section(label: str, content: str) -> str:
    return f"\n/* ===== {label} ===== */\n{content.strip()}\n"


def strip_css_imports(content: str) -> str:
    return re.sub(r"^\s*@import\s+url\([^;]+;\s*", "", content, flags=re.I | re.M)


def build_css() -> None:
    base = strip_css_imports(read("css/mobile-base.css"))
    editorial = read("css/editorial.css")
    reading = read("css/leitura-imersiva.css")
    mobile = strip_css_imports(read("css/mobile.css"))
    systems = read("css/sistemas.css")
    systems_fallback = read("css/sistemas-fallback.css")
    systems_hotfix = read("css/sistemas-hotfix.css")
    systems_architecture = read("css/sistemas-arquitetura.css")
    atlas = read("css/atlas-novo.css")
    apotheosis = read("css/apoteose.css")
    stable = read("css/layout-estavel-v2.css")
    systems_colors = read("css/sistemas-cores-v2.css")
    responsive_polish = read("css/polimento-responsivo.css")

    compact_gpu = """
/* Reduz custo de composição em aparelhos de toque sem mudar o layout. */
html.ui-compact body::before { display: none !important; }
html.ui-compact :is(.site-header, .mobile-header, .content-index) {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
"""

    core = "".join([
        section("BASE", base),
        section("EDITORIAL", editorial),
        section("LEITURA", reading),
        section("AJUSTES MOBILE", mobile),
        section("DESEMPENHO COMPACTO", compact_gpu),
    ])
    core_systems = "".join([
        section("BASE", base),
        section("EDITORIAL", editorial),
        section("SISTEMAS", systems),
        section("SISTEMAS FALLBACK", systems_fallback),
        section("SISTEMAS HOTFIX", systems_hotfix),
        section("SISTEMAS ARQUITETURA", systems_architecture),
        section("LEITURA", reading),
        section("AJUSTES MOBILE", mobile),
        section("DESEMPENHO COMPACTO", compact_gpu),
    ])
    final = "".join([
        section("ATLAS", atlas),
        section("APOTEOSE", apotheosis),
        section("LAYOUT ESTÁVEL", stable),
        section("POLIMENTO RESPONSIVO", responsive_polish),
    ])
    final_systems = "".join([
        section("ATLAS", atlas),
        section("APOTEOSE", apotheosis),
        section("CORES DOS SISTEMAS", systems_colors),
        section("LAYOUT ESTÁVEL", stable),
        section("POLIMENTO RESPONSIVO", responsive_polish),
    ])

    write("css/site-core.css", core)
    write("css/site-core-systems.css", core_systems)
    write("css/site-final.css", final)
    write("css/site-final-systems.css", final_systems)


def build_js() -> None:
    editorial_path = ROOT / "js/editorial-core.js"
    editorial = editorial_path.read_text(encoding="utf-8")
    editorial = re.sub(
        r"\s*link\.scrollIntoView\(\{\s*block:\s*'nearest',\s*inline:\s*'center',\s*behavior:\s*'smooth'\s*\}\);",
        "",
        editorial,
    )
    editorial_path.write_text(editorial.rstrip() + "\n", encoding="utf-8")

    systems = read("js/sistemas.js")
    systems = re.sub(
        r"\s*ensureStylesheet\('systems-base-style',\s*'\.\./css/sistemas\.css'\);",
        "",
        systems,
    )
    systems = re.sub(
        r"\s*ensureStylesheet\('systems-architecture-style',\s*'\.\./css/sistemas-arquitetura\.css'\);",
        "",
        systems,
    )
    atlas = read("js/atlas-novo.js")

    write("js/site.js", section("EDITORIAL", editorial) + section("INTERFACE", atlas))
    write(
        "js/site-systems.js",
        section("EDITORIAL", editorial)
        + section("SISTEMAS", systems)
        + section("INTERFACE", atlas),
    )


def relative_prefix(path: Path) -> str:
    depth = len(path.relative_to(ROOT).parents) - 1
    return "../" * depth


def is_system_page(path: Path) -> bool:
    return path.parent.name == "sistemas"


def optimize_images(html: str) -> str:
    def replace(match: re.Match[str]) -> str:
        tag = match.group(0)
        hero = "fetchpriority=\"high\"" in tag or "fetchpriority='high'" in tag or "internal-hero-image" in tag
        if not re.search(r"\sdecoding=", tag, flags=re.I):
            tag = tag[:-1] + ' decoding="async">'
        if not hero and not re.search(r"\sloading=", tag, flags=re.I):
            tag = tag[:-1] + ' loading="lazy">'
        return tag

    return re.sub(r"<img\b[^>]*>", replace, html, flags=re.I)


def remove_resource_links(html: str, systems_page: bool) -> str:
    names = [
        "mobile.css", "mobile-base.css", "editorial.css", "leitura-imersiva.css",
        "sistemas.css", "sistemas-fallback.css", "sistemas-hotfix.css",
        "sistemas-arquitetura.css", "atlas-novo.css", "apoteose.css",
        "layout-estavel-v2.css", "polimento-responsivo.css", "site-core.css",
        "site-core-systems.css", "site-final.css", "site-final-systems.css",
    ]
    if systems_page:
        names.append("sistemas-cores-v2.css")

    pattern = "|".join(re.escape(name) for name in names)
    return re.sub(
        rf"\s*<link\b[^>]*href=[\"'][^\"']*(?:{pattern})(?:\?[^\"']*)?[\"'][^>]*>\s*",
        "\n",
        html,
        flags=re.I,
    )


def remove_script_links(html: str) -> str:
    pattern = "|".join(map(re.escape, [
        "editorial.js", "editorial-core.js", "atlas-novo.js", "sistemas.js",
        "site.js", "site-systems.js",
    ]))
    return re.sub(
        rf"\s*<script\b[^>]*src=[\"'][^\"']*(?:{pattern})(?:\?[^\"']*)?[\"'][^>]*></script>\s*",
        "\n",
        html,
        flags=re.I,
    )


def remove_font_hints(html: str) -> str:
    html = re.sub(
        r"\s*<link\b[^>]*(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>\s*",
        "\n",
        html,
        flags=re.I,
    )
    return html


def insert_styles(path: Path, html: str) -> str:
    systems_page = is_system_page(path)
    prefix = relative_prefix(path)
    core = "site-core-systems.css" if systems_page else "site-core.css"
    final = "site-final-systems.css" if systems_page else "site-final.css"

    early = (
        '  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        f'  <link rel="stylesheet" href="{FONT_URL}">\n'
        f'  <link rel="stylesheet" href="{prefix}css/{core}?v={VERSION}">\n'
    )
    late = f'  <link rel="stylesheet" href="{prefix}css/{final}?v={VERSION}">\n'

    first_stylesheet = re.search(r"^[ \t]*<link\b[^>]*rel=[\"']stylesheet[\"'][^>]*>", html, flags=re.I | re.M)
    if first_stylesheet:
        html = html[:first_stylesheet.start()] + early + html[first_stylesheet.start():]
    else:
        html = html.replace("</head>", early + "</head>", 1)

    html = html.replace("</head>", late + "</head>", 1)
    return html


def insert_script(path: Path, html: str) -> str:
    prefix = relative_prefix(path)
    bundle = "site-systems.js" if is_system_page(path) else "site.js"
    tag = f'  <script src="{prefix}js/{bundle}?v={VERSION}" defer></script>\n'
    return html.replace("</body>", tag + "</body>", 1)


def process_html(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    systems_page = is_system_page(path)
    html = remove_resource_links(original, systems_page)
    html = remove_script_links(html)
    html = remove_font_hints(html)
    html = optimize_images(html)
    html = insert_styles(path, html)
    html = insert_script(path, html)
    html = re.sub(r"\n{3,}", "\n\n", html)

    if html == original:
        return False
    path.write_text(html, encoding="utf-8")
    return True


def html_files() -> list[Path]:
    files = [ROOT / "index.html"]
    for directory in HTML_ROOTS:
        root = ROOT / directory
        if root.exists():
            files.extend(sorted(root.rglob("*.html")))
    return [path for path in files if path.exists()]


def main() -> int:
    build_css()
    build_js()
    changed = [path for path in html_files() if process_html(path)]
    print(f"Bundles gerados e {len(changed)} páginas atualizadas.")
    for path in changed:
        print(f"- {path.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
