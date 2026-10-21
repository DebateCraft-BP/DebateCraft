# Historical reference-capture utility. Not used by the DebateCraft application.
"""Fetch the approved homepage's assets, retaining source URLs and checksums."""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from pathlib import Path
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://www.hejlfoundation.org/'
IMAGES = {
    'grant-athletes.webp': '2024/06/pexels-pixabay-33703-1-jpg.webp',
    'grant-opera.webp': '2024/06/opera4-e1635375200792-jpg.webp',
    'grant-student.webp': '2024/06/ben-mullins-je240kkjiua-unsplash-2-jpg.webp',
    'grant-health.webp': '2024/06/cdc-n6z8c6nugfe-unsplash-1-jpg.webp',
    'program-arts.webp': '2024/06/img-program-02-jpg.webp',
    'program-education.webp': '2024/06/img-program-01-jpg.webp',
    'program-health.webp': '2024/06/img-program-03-jpg.webp',
    'program-policy.webp': '2024/06/img-program-04-jpg.webp',
    'story-opera.webp': '2024/05/2p5a6000-1-2560x1707.webp',
    'story-kayaking.webp': '2024/05/445488144-775096791396346-874272943882493083-n-jpg.webp',
    'hero.mp4': '2024/06/8160133-uhd-3840-2160-25fps-1.mp4',
}
FONTS = ['Inter-Regular.woff2', 'Inter-Medium.woff2', 'PPEditorialNew-Ultralight.woff2', 'PPEditorialNew-UltralightItalic.woff2']
ASSETS = [(f'public/media/{name}', BASE + 'app/uploads/' + source) for name, source in IMAGES.items()]
ASSETS += [(f'public/fonts/{font}', BASE + 'app/themes/hejl-foundation/_/dist/' + font) for font in FONTS]
ASSETS += [('public/favicon.png', BASE + 'app/themes/hejl-foundation/favicon.png')]

def fetch(item):
    target, url = item
    path = ROOT / target
    path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(['curl', '--fail', '--location', '--silent', '--show-error', '--retry', '2', url, '-o', str(path)], check=True)
    data = path.read_bytes()
    if target.endswith('.woff2'):
        assert data[:4] == b'wOF2', target
    elif target.endswith('.webp'):
        assert data[:4] == b'RIFF' and data[8:12] == b'WEBP', target
    elif target.endswith('.mp4'):
        assert data[4:8] == b'ftyp', target
    elif target.endswith('.png'):
        assert data[:8] == b'\x89PNG\r\n\x1a\n', target
    return {'file': target, 'source': url, 'bytes': len(data), 'sha256': sha256(data).hexdigest()}

if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=5) as pool:
        records = list(pool.map(fetch, ASSETS))
    poster = ROOT / 'public/media/hero-poster.jpg'
    subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-ss', '0.4', '-i', str(ROOT / 'public/media/hero.mp4'), '-frames:v', '1', '-q:v', '2', str(poster)], check=True)
    derived = [{'file': 'public/media/hero-poster.jpg', 'source': 'public/media/hero.mp4', 'frameSeconds': 0.4, 'sha256': sha256(poster.read_bytes()).hexdigest()}]
    (ROOT / 'public/asset-sources.json').write_text(json.dumps({'captured': '2026-10-20', 'assets': records, 'derived': derived}, indent=2) + '\n')
    print(f'Verified {len(records)} local assets: {sum(x["bytes"] for x in records):,} bytes')
