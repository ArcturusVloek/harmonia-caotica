#!/usr/bin/env python3
"""Atualiza e ordena os recursos responsivos em todas as páginas HTML."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MOBILE_VERSION = "20260718h"
ATLAS_JS_VERSION = "20260718d"
INTERFACE_VERSION = "20260718d"
SYSTEM_COLORS_VERSION = "20260718d"

STYLE_LINE = re.compile(
    r'(?P<indent>\s*)<link\s+rel="stylesheet"\s+href="(?P<prefix>(?:\.\./)*)css/apoteose\.css(?:\?v=[^"\']+)?">'
)


def remove_final_layers(html: str) -> str:
    patterns = (
        r'\n?\s*<link\s+rel="stylesheet"\s+href="(?:\.\./)*css/interface-estavel\.css(?:\?v=[^"\']+)?">',
        r'\n?\s*<link\s+rel="stylesheet"\s+href="(?:\.\./)*css/sistemas-cores-v2\.css(?:\?v=[^"\']+)?">',
    )
    for pattern in patterns:
        html = re.sub(pattern, "", html)
    return html


def add_final_layers(path: Path, html: str) -> str:
    match = STYLE_LINE.search(html)
    if not match:
        return html

    indent = match.group("indent")
    prefix = match.group("prefix")
    links = [
        f'{indent}<link rel="stylesheet" href="{prefix}css/interface-estavel.css?v={INTERFACE_VERSION}">'
    ]

    if "sistemas" in path.parts:
        links.append(
            f'{indent}<link rel="stylesheet" href="{prefix}css/sistemas-cores-v2.css?v={SYSTEM_COLORS_VERSION}">'
        )

    insertion = match.group(0) + "\n" + "\n".join(links)
    return html[:match.start()] + insertion + html[match.end():]


def update_html(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    updated = re.sub(
        r"mobile\.css(?:\?v=[^\"']+)?",
        f"mobile.css?v={MOBILE_VERSION}",
        original,
    )
    updated = re.sub(
        r"atlas-novo\.js(?:\?v=[^\"']+)?",
        f"atlas-novo.js?v={ATLAS_JS_VERSION}",
        updated,
    )
    updated = remove_final_layers(updated)
    updated = add_final_layers(path, updated)

    if updated == original:
        return False

    path.write_text(updated, encoding="utf-8")
    return True


def main() -> int:
    changed = [path for path in ROOT.rglob("*.html") if update_html(path)]
    if changed:
        print("Recursos responsivos atualizados em:")
        for path in changed:
            print(f"- {path.relative_to(ROOT)}")
    else:
        print("Todas as páginas já usam as camadas finais na ordem correta.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
