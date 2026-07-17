#!/usr/bin/env python3
"""Insere os recursos visuais compartilhados nas páginas de Sistemas."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SYSTEMS_DIR = ROOT / "sistemas"
STYLE_HREF = "../css/sistemas.css"
SCRIPT_SRC = "../js/sistemas.js"
LAYOUT_VERSION = 1


def apply_to_page(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    html = original

    if STYLE_HREF not in html:
        domain_link = '<link rel="stylesheet" href="../css/dominios.css">'
        mobile_link = '<link rel="stylesheet" href="../css/mobile.css">'
        style_link = f'  <link rel="stylesheet" href="{STYLE_HREF}">'

        if domain_link in html:
            html = html.replace(domain_link, domain_link + "\n" + style_link, 1)
        elif mobile_link in html:
            html = html.replace(mobile_link, mobile_link + "\n" + style_link, 1)

    if SCRIPT_SRC not in html:
        editorial_script = '<script src="../js/editorial.js" defer></script>'
        systems_script = f'  <script src="{SCRIPT_SRC}" defer></script>'

        if editorial_script in html:
            html = html.replace(editorial_script, systems_script + "\n  " + editorial_script, 1)
        else:
            html = html.replace("</body>", systems_script + "\n</body>", 1)

    if html != original:
        path.write_text(html, encoding="utf-8")
        return True

    return False


def main() -> int:
    changed: list[Path] = []

    for path in sorted(SYSTEMS_DIR.glob("*.html")):
        if apply_to_page(path):
            changed.append(path)

    if changed:
        print(f"Layout de Sistemas v{LAYOUT_VERSION} aplicado a:")
        for path in changed:
            print(f"- {path.relative_to(ROOT)}")
    else:
        print(f"Todas as páginas de Sistemas já utilizam o layout compartilhado v{LAYOUT_VERSION}.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
