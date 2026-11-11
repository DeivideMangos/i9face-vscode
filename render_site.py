#!/usr/bin/env python3
"""Render the supplied service catalogs into the crawlable static home page."""
from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def escape(value: str | None) -> str:
    return html.escape(value or "", quote=True)

def render_catalog(catalog: dict) -> str:
    groups = []
    for index, category in enumerate(catalog["categories"]):
        note = category.get("note")
        note_html = f'<p class="service-note">{escape(note)}</p>' if note else ""
        rows = []
        for item in category.get("items", []):
            detail = item.get("detail")
            detail_html = f'<span class="service-row-detail">{escape(detail)}</span>' if detail else ""
            rows.append(
                '<li class="service-row">'
                f'<span class="service-row-name">{escape(item["name"])}{detail_html}</span>'
                f'<strong class="service-price">{escape(item.get("price", ""))}</strong>'
                '</li>'
            )
        opened = " open" if index == 0 else ""
        groups.append(
            f'<details class="service-group"{opened}>'
            f'<summary>{escape(category["name"])}</summary>'
            f'<div class="service-content">{note_html}'
            f'<ul class="service-list">{"".join(rows)}</ul></div>'
            '</details>'
        )
    return (
        f'<h4 class="catalog-panel-title">{escape(catalog["title"])}</h4>'
        f'<div class="catalog-grid">{"".join(groups)}</div>'
    )

data = json.loads((ROOT / "catalogs.json").read_text(encoding="utf-8"))
template = (ROOT / "index.template.html").read_text(encoding="utf-8")
page = template.replace("{{FACIAL_CATALOG}}", render_catalog(data["facial"]))
page = page.replace("{{BASICA_CATALOG}}", render_catalog(data["basica"]))
if "{{FACIAL_CATALOG}}" in page or "{{BASICA_CATALOG}}" in page:
    raise SystemExit("Falha: marcador de catálogo não foi substituído.")
(ROOT / "index.html").write_text(page, encoding="utf-8")
items_count = sum(len(cat["items"]) for catalog in data.values() for cat in catalog["categories"])
print(f"index.html gerado: {sum(len(c['categories']) for c in data.values())} categorias e {items_count} serviços.")
