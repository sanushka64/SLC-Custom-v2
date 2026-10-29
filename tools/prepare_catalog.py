"""Rebuild WebP screenshot previews and the browser's catalog.js.

From the website root:
    python -m pip install Pillow
    python tools/prepare_catalog.py

Edit catalog.json and put matching full-resolution image files in assets first.
"""
from pathlib import Path
import json
import re

try:
    from PIL import Image
except ImportError as exc:
    raise SystemExit("Install Pillow first: python -m pip install Pillow") from exc

root = Path(__file__).resolve().parent.parent
catalog_path = root / 'catalog.json'
catalog = json.loads(catalog_path.read_text(encoding='utf-8'))
previews = root / 'assets' / 'previews'
previews.mkdir(parents=True, exist_ok=True)

def slug(value):
    return re.sub(r'[^a-z0-9-]+', '-', str(value).lower()).strip('-')

count = 0
for d in catalog:
    pages_total = 0
    for section in d['sections']:
        for page in section['pages']:
            original = root / page['image']
            if not original.is_file():
                raise SystemExit(f"Missing screenshot: {original}")
            target = previews / f"{slug(d['id'])}--{slug(section['id'])}--{slug(page['id'])}.webp"
            with Image.open(original) as raw:
                small = raw.convert('RGB')
                small.thumbnail((880, 495), Image.Resampling.LANCZOS)
                small.save(target, format='WEBP', quality=79, method=5)
            page['preview'] = 'assets/previews/' + target.name
            pages_total += 1
            count += 1
    d['pageCount'] = pages_total
    d['cover'] = d['sections'][0]['pages'][0]['preview']
catalog_path.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
(root / 'catalog.js').write_text('/* Local static dashboard catalog. */\nwindow.DASHBOARD_CATALOG = ' + json.dumps(catalog, indent=2, ensure_ascii=False) + ';\n', encoding='utf-8')
print(f"Prepared {count} page previews across {len(catalog)} dashboards.")
