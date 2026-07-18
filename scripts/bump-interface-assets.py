#!/usr/bin/env python3
"""Atualiza as versões de cache dos recursos compartilhados da interface."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPLACEMENTS = {
    "mobile.css?v=20260718e": "mobile.css?v=20260718f",
    "atlas-novo.js?v=20260718a": "atlas-novo.js?v=20260718b",
}


def main() -> int:
    changed = []

    for path in sorted(ROOT.rglob("*.html")):
        original = path.read_text(encoding="utf-8")
        updated = original

        for old, new in REPLACEMENTS.items():
            updated = updated.replace(old, new)

        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed.append(path.relative_to(ROOT))

    if changed:
        print("Referências atualizadas:")
        for path in changed:
            print(f"- {path}")
    else:
        print("Nenhuma referência antiga foi encontrada.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
