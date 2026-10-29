"""Dependency-free asset and catalog checks: python tools/check_site.py"""
from pathlib import Path
import json

root=Path(__file__).resolve().parent.parent
catalog=json.loads((root/'catalog.json').read_text(encoding='utf-8'))
errors=[]
seen_dashboard=set()
seen_preview=set()
count=0
for dashboard in catalog:
    d=dashboard['id']
    if d in seen_dashboard: errors.append(f'Duplicate dashboard id: {d}')
    seen_dashboard.add(d)
    page_count=0
    for section in dashboard['sections']:
        seen_pages=set()
        for page in section['pages']:
            page_count+=1
            count+=1
            if page['id'] in seen_pages:errors.append(f'Duplicate page in {d}/{section["id"]}: {page["id"]}')
            seen_pages.add(page['id'])
            for field in ('image','preview'):
                path=root/page[field]
                if not path.is_file():errors.append(f'Missing {field}: {path}')
                elif path.stat().st_size==0:errors.append(f'Empty {field}: {path}')
            if page['preview'] in seen_preview:errors.append(f'Preview collision: {page["preview"]}')
            seen_preview.add(page['preview'])
    if page_count != dashboard['pageCount']:errors.append(f'Wrong pageCount for {d}')
for file in ('index.html','app.js','styles.css','catalog.js','customs_logo.png','cwt-logo.png','serve.py'):
    if not (root/file).is_file():errors.append(f'Missing website file: {file}')
print(f'{len(catalog)} dashboards / {count} pages / {len(seen_preview)} unique previews')
if errors:
    for error in errors: print('ERROR:',error)
    raise SystemExit(1)
print('PASS: all referenced files and dashboard counts are valid.')
