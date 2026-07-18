#!/usr/bin/env python3
"""Aplica a arquitetura responsiva consolidada a todas as páginas HTML.

O script não altera textos canônicos. Ele somente normaliza viewport, ordem de
recursos, detecção antecipada de dispositivo e versões de cache.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_ROOTS = ("divindades", "dominios", "territorios", "mundo", "sistemas", "templates")
DEVICE_VERSION = "20260718a"
LAYOUT_VERSION = "20260718a"
ATLAS_VERSION = "20260718e"
EDITORIAL_VERSION = "20260718b"
SYSTEM_COLORS_VERSION = "20260718e"


def relative_prefix(path: Path) -> str:
    depth = len(path.relative_to(ROOT).parents) - 1
    return "../" * depth


def normalize_viewport(html: str) -> str:
    viewport = '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
    if re.search(r'<meta\s+name=["\']viewport["\'][^>]*>', html, flags=re.I):
        return re.sub(r'<meta\s+name=["\']viewport["\'][^>]*>', viewport, html, count=1, flags=re.I)

    charset = re.search(r'<meta\s+charset=["\'][^"\']+["\']\s*/?>', html, flags=re.I)
    if charset:
        return html[:charset.end()] + "\n  " + viewport + html[charset.end():]
    return html.replace('<head>', '<head>\n  ' + viewport, 1)


def add_mobile_meta(html: str) -> str:
    additions = []
    if 'name="format-detection"' not in html:
        additions.append('<meta name="format-detection" content="telephone=no">')
    if 'name="mobile-web-app-capable"' not in html:
        additions.append('<meta name="mobile-web-app-capable" content="yes">')
    if 'name="apple-mobile-web-app-capable"' not in html:
        additions.append('<meta name="apple-mobile-web-app-capable" content="yes">')
    if not additions:
        return html

    viewport = re.search(r'<meta\s+name=["\']viewport["\'][^>]*>', html, flags=re.I)
    if viewport:
        block = "\n  " + "\n  ".join(additions)
        return html[:viewport.end()] + block + html[viewport.end():]
    return html


def normalize_resources(path: Path, html: str) -> str:
    prefix = relative_prefix(path)

    html = re.sub(
        r'\s*<script\s+src=["\'][^"\']*js/device-mode\.js(?:\?v=[^"\']+)?["\'][^>]*></script>\s*',
        '\n',
        html,
        flags=re.I,
    )
    html = re.sub(
        r'\s*<link\s+rel=["\']stylesheet["\']\s+href=["\'][^"\']*css/interface-estavel\.css(?:\?v=[^"\']+)?["\'][^>]*>\s*',
        '\n',
        html,
        flags=re.I,
    )
    html = re.sub(
        r'\s*<link\s+rel=["\']stylesheet["\']\s+href=["\'][^"\']*css/layout-estavel-v2\.css(?:\?v=[^"\']+)?["\'][^>]*>\s*',
        '\n',
        html,
        flags=re.I,
    )

    device_script = f'<script src="{prefix}js/device-mode.js?v={DEVICE_VERSION}"></script>'
    viewport = re.search(r'<meta\s+name=["\']viewport["\'][^>]*>', html, flags=re.I)
    if viewport:
        html = html[:viewport.end()] + "\n  " + device_script + html[viewport.end():]
    else:
        html = html.replace('<head>', '<head>\n  ' + device_script, 1)

    layout_link = f'<link rel="stylesheet" href="{prefix}css/layout-estavel-v2.css?v={LAYOUT_VERSION}">'
    html = html.replace('</head>', f'  {layout_link}\n</head>', 1)

    html = re.sub(
        r'atlas-novo\.js(?:\?v=[^"\']+)?',
        f'atlas-novo.js?v={ATLAS_VERSION}',
        html,
    )
    html = re.sub(
        r'editorial\.js(?:\?v=[^"\']+)?',
        f'editorial.js?v={EDITORIAL_VERSION}',
        html,
    )
    html = re.sub(
        r'sistemas-cores-v2\.css(?:\?v=[^"\']+)?',
        f'sistemas-cores-v2.css?v={SYSTEM_COLORS_VERSION}',
        html,
    )

    return html


def process(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    html = normalize_viewport(original)
    html = add_mobile_meta(html)
    html = normalize_resources(path, html)

    # Remove excesso de linhas vazias no cabeçalho sem tocar no corpo.
    head_end = html.find('</head>')
    if head_end != -1:
        head = re.sub(r'\n{3,}', '\n\n', html[:head_end])
        html = head + html[head_end:]

    if html == original:
        return False
    path.write_text(html, encoding="utf-8")
    return True


def html_files() -> list[Path]:
    files = [ROOT / 'index.html']
    for directory in HTML_ROOTS:
        root = ROOT / directory
        if root.exists():
            files.extend(sorted(root.rglob('*.html')))
    return [path for path in files if path.exists()]


def main() -> int:
    changed = [path for path in html_files() if process(path)]
    if changed:
        print('Arquitetura responsiva aplicada a:')
        for path in changed:
            print(f'- {path.relative_to(ROOT)}')
    else:
        print('Todas as páginas já utilizam a arquitetura responsiva atual.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
