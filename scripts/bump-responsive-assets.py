#!/usr/bin/env python3
"""Atualiza as versões dos recursos responsivos em todas as páginas HTML."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MOBILE_VERSION = "20260718g"
ATLAS_JS_VERSION = "20260718c"


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

    if updated == original:
        return False

    path.write_text(updated, encoding="utf-8")
    return True


def main() -> int:
    changed = [path for path in ROOT.rglob("*.html") if update_html(path)]
    if changed:
        print("Versões responsivas atualizadas em:")
        for path in changed:
            print(f"- {path.relative_to(ROOT)}")
    else:
        print("Todas as páginas já usam as versões atuais.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
