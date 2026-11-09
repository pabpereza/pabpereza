#!/usr/bin/env python3
"""Rellena src/data/youtube-videos.json con los datos de los vídeos que
declaran las docs en su frontmatter (`youtube: <id>`).

El JSON se commitea: el build no llama a la API, solo lo lee para generar el
VideoObject de cada capítulo. Se ejecuta en local porque usa el token OAuth
de .channel/.management/youtube-api (ver su README).

    npm run update-videos           # solo los IDs que faltan
    npm run update-videos -- --all  # refresca todos
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "src" / "data" / "youtube-videos.json"
SOURCES = [ROOT / "docs", ROOT / "blog"]
DESCRIPTION_MAX = 500

sys.path.insert(0, str(ROOT / ".channel" / ".management" / "youtube-api"))
import youtube_api as yt  # noqa: E402

FRONTMATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)
YOUTUBE_RE = re.compile(r"^youtube:\s*['\"]?([A-Za-z0-9_-]{11})['\"]?\s*$", re.MULTILINE)


def ids_in_content():
    ids = set()
    for base in SOURCES:
        for path in base.rglob("*.md*"):
            fm = FRONTMATTER_RE.match(path.read_text(encoding="utf-8"))
            if fm:
                ids.update(YOUTUBE_RE.findall(fm.group(1)))
    return ids


def first_paragraph(text):
    # La descripción de YouTube arrastra el bloque fijo (membresía, enlaces...):
    # para el JSON-LD basta el primer párrafo
    para = text.strip().split("\n\n")[0].strip()
    return para[:DESCRIPTION_MAX]


def fetch(ids):
    found = {}
    for chunk in yt._chunks(sorted(ids), 50):
        result = yt._api_request("GET", f"{yt.DATA_API}/videos", params={
            "part": "snippet,contentDetails,status",
            "id": ",".join(chunk),
        })
        for item in result.get("items", []):
            sn = item["snippet"]
            found[item["id"]] = {
                "title": sn["title"],
                "description": first_paragraph(sn.get("description", "")),
                "publishedAt": sn["publishedAt"],
                "duration": item["contentDetails"]["duration"],
                # Con la inserción desactivada en YouTube el iframe da error:
                # el tema enseña la miniatura enlazada en su lugar
                "embeddable": item["status"].get("embeddable", True),
            }
    return found


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--all", action="store_true", help="refrescar también los que ya están")
    args = parser.parse_args()

    current = json.loads(OUT.read_text()) if OUT.exists() else {}
    wanted = ids_in_content()
    pending = wanted if args.all else wanted - current.keys()

    if pending:
        fetched = fetch(pending)
        current.update(fetched)
        missing = pending - fetched.keys()
        if missing:
            print(f"⚠️  No encontrados en YouTube (privados o borrados): {', '.join(sorted(missing))}")

    # Fuera los que ya no usa ninguna página
    current = {k: current[k] for k in sorted(current) if k in wanted}
    OUT.write_text(json.dumps(current, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{len(current)} vídeos en {OUT.relative_to(ROOT)} ({len(pending)} consultados)")


if __name__ == "__main__":
    main()
