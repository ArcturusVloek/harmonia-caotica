#!/usr/bin/env python3
"""Aplica o padrão editorial compartilhado às páginas de Harmonia Caótica.

O script é idempotente: pode ser executado novamente sempre que novas páginas
forem adicionadas. Ele não altera os textos canônicos, apenas estrutura, classes,
carregamento de imagens e recursos compartilhados.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_GROUPS = ("divindades", "territorios", "mundo", "sistemas")
TERRITORY_SLUGS = {"ruvia", "umbra", "alba", "tirena", "nevia"}


def add_class(classes: list[str], value: str) -> None:
    if value not in classes:
        classes.append(value)


def normalize_class_attributes(html: str, is_territory: bool) -> str:
    if not is_territory:
        return html

    territory_prefixes = "|".join(sorted(TERRITORY_SLUGS))

    def replace(match: re.Match[str]) -> str:
        quote = match.group(1)
        classes = match.group(2).split()
        original = list(classes)

        for token in original:
            if re.fullmatch(rf"(?:{territory_prefixes})-hero", token):
                add_class(classes, "territory-hero")
            elif token.endswith("-hero__layout"):
                add_class(classes, "territory-hero__layout")
            elif token.endswith("-hero__content"):
                add_class(classes, "territory-hero__content")
            elif token.endswith("-hero__index"):
                add_class(classes, "territory-hero__index")
            elif token.endswith("-hero__title"):
                add_class(classes, "territory-hero__title")
            elif token.endswith("-hero__domain"):
                add_class(classes, "territory-hero__domain")
            elif token.endswith("-hero__summary"):
                add_class(classes, "territory-hero__summary")
            elif re.fullmatch(rf"(?:{territory_prefixes})-facts", token):
                add_class(classes, "territory-facts")
            elif re.fullmatch(rf"(?:{territory_prefixes})-fact", token):
                add_class(classes, "territory-fact")
            elif re.fullmatch(rf"(?:{territory_prefixes})-index", token):
                add_class(classes, "territory-index")
                add_class(classes, "content-index")
            elif token.endswith("-index__list"):
                add_class(classes, "territory-index__list")
                add_class(classes, "content-index__list")
            elif re.fullmatch(rf"(?:{territory_prefixes})-content", token):
                add_class(classes, "territory-content")
            elif re.fullmatch(rf"(?:{territory_prefixes})-opening", token):
                add_class(classes, "territory-opening")
            elif token.endswith("-opening__copy"):
                add_class(classes, "territory-opening__copy")
            elif token.endswith("-opening__lead"):
                add_class(classes, "territory-opening__lead")
            elif re.fullmatch(rf"(?:{territory_prefixes})-section", token):
                add_class(classes, "territory-section")
            elif token.endswith("-section__heading"):
                add_class(classes, "territory-section__heading")
            elif token.endswith("-section__number"):
                add_class(classes, "territory-section__number")
            elif token.endswith("-section__kicker"):
                add_class(classes, "territory-section__kicker")
            elif token.endswith("-section__summary"):
                add_class(classes, "territory-section__summary")

            if re.search(r"(?:card|entry|panel|note)$", token):
                add_class(classes, "territory-card")
            if re.search(r"(?:grid|ledger)$", token):
                add_class(classes, "territory-grid")

        return f'class={quote}{" ".join(classes)}{quote}'

    return re.sub(r'class=(["\'])(.*?)\1', replace, html, flags=re.DOTALL)


def normalize_images(html: str) -> str:
    def replace(match: re.Match[str]) -> str:
        tag = match.group(0)
        is_hero = (
            "internal-hero-image" in tag
            or "fetchpriority=\"high\"" in tag
            or "fetchpriority='high'" in tag
        )

        if not re.search(r"\sdecoding=", tag):
            tag = tag[:-1] + ' decoding="async">'

        if is_hero:
            tag = re.sub(r"\sloading=([\"'])lazy\1", "", tag)
            if not re.search(r"\sfetchpriority=", tag):
                tag = tag[:-1] + ' fetchpriority="high">'
        elif not re.search(r"\sloading=", tag):
            tag = tag[:-1] + ' loading="lazy">'

        return tag

    return re.sub(r"<img\b[^>]*>", replace, html, flags=re.IGNORECASE)


def extract_inline_territory_css(path: Path, html: str) -> str:
    if path.parent.name != "territorios":
        return html

    blocks = re.findall(r"\s*<style>(.*?)</style>\s*", html, flags=re.DOTALL | re.IGNORECASE)
    if not blocks:
        return html

    slug = path.stem
    css_path = ROOT / "css" / f"{slug}.css"
    existing = css_path.read_text(encoding="utf-8") if css_path.exists() else ""
    extracted = "\n\n".join(block.strip() for block in blocks if block.strip())

    if extracted and extracted not in existing:
        header = f"/* Estilos territoriais de {slug.title()} — extraídos do HTML */\n"
        combined = existing.rstrip() + ("\n\n" if existing.strip() else header) + extracted + "\n"
        css_path.write_text(combined, encoding="utf-8")

    html = re.sub(r"\s*<style>.*?</style>\s*", "\n", html, flags=re.DOTALL | re.IGNORECASE)
    href = f'../css/{slug}.css'
    if href not in html:
        mobile_link = '<link rel="stylesheet" href="../css/mobile.css">'
        territory_link = f'  <link rel="stylesheet" href="{href}">'
        html = html.replace(mobile_link, mobile_link + "\n" + territory_link, 1)

    return html


def add_editorial_placeholders(path: Path, html: str) -> str:
    if path == ROOT / "index.html":
        return html

    if "data-auto-record" not in html:
        main_match = re.search(r"<main\b[^>]*>", html, flags=re.IGNORECASE)
        if main_match:
            hero_end = html.find("</section>", main_match.end())
            if hero_end != -1:
                insertion = hero_end + len("</section>")
                placeholder = '\n\n    <aside class="archive-record" data-auto-record aria-label="Identificação editorial"></aside>'
                html = html[:insertion] + placeholder + html[insertion:]

    has_page_index = "id=\"indice-da-pagina\"" in html or "id='indice-da-pagina'" in html
    if not has_page_index and path.parent.name != "territorios":
        record_end = html.find("</aside>", html.find("data-auto-record"))
        if record_end != -1:
            insertion = record_end + len("</aside>")
            placeholder = (
                '\n\n    <nav id="indice-da-pagina" class="content-index" '
                'data-auto-index aria-label="Índice da página"></nav>'
            )
            html = html[:insertion] + placeholder + html[insertion:]

    if path.parent.name == "territorios" and not has_page_index:
        nav_match = re.search(r"<nav\b[^>]*class=([\"'])[^\"']*-index[^\"']*\1", html)
        if nav_match:
            tag_end = html.find(">", nav_match.start())
            html = html[:tag_end] + ' id="indice-da-pagina"' + html[tag_end:]

    return html


def add_editorial_script(path: Path, html: str) -> str:
    if "editorial.js" in html:
        return html

    depth = len(path.relative_to(ROOT).parents) - 1
    src = "../" * depth + "js/editorial.js"
    script = f'  <script src="{src}" defer></script>\n'
    return html.replace("</body>", script + "</body>", 1)


def mark_document(html: str) -> str:
    if "data-editorial-system=" not in html:
        html = re.sub(
            r"<html\b([^>]*)>",
            r'<html\1 data-editorial-system="vaelora">',
            html,
            count=1,
            flags=re.IGNORECASE,
        )
    return html


def process_html(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    html = original
    is_territory = path.parent.name == "territorios"

    html = extract_inline_territory_css(path, html)
    html = normalize_class_attributes(html, is_territory)
    html = normalize_images(html)
    html = add_editorial_placeholders(path, html)
    html = add_editorial_script(path, html)
    html = mark_document(html)

    if html != original:
        path.write_text(html, encoding="utf-8")
        return True
    return False


def main() -> int:
    changed: list[Path] = []

    root_index = ROOT / "index.html"
    if root_index.exists() and process_html(root_index):
        changed.append(root_index)

    for group in HTML_GROUPS:
        directory = ROOT / group
        if not directory.exists():
            continue
        for path in sorted(directory.rglob("*.html")):
            if process_html(path):
                changed.append(path)

    if changed:
        print("Padrão editorial aplicado a:")
        for path in changed:
            print(f"- {path.relative_to(ROOT)}")
    else:
        print("Nenhuma alteração necessária; o padrão editorial já está aplicado.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
