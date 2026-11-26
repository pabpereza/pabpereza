import json
import re
import urllib.parse
import urllib.request
import os
import xml.etree.ElementTree as ET

YOUTUBE_PPZ_CHANNEL_ID = 'UCGfKISiN7usAdxvcGivm_OA'
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
BLOG_RSS_URL = 'https://pabpereza.dev/blog/rss.xml'
DATA_API = 'https://www.googleapis.com/youtube/v3'

# Mismos tramos que el videoDuration de search: medium 4-20 min, long > 20 min
DURATIONS = {'short': (0, 240), 'medium': (240, 1200), 'long': (1200, float('inf'))}
ISO_DURATION_RE = re.compile(r'P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?')


def _get(endpoint, key, **params):
  url = f"{DATA_API}/{endpoint}?{urllib.parse.urlencode({**params, 'key': key})}"
  return json.loads(urllib.request.urlopen(url).read())


def _seconds(iso):
  d, h, m, s = (int(x or 0) for x in ISO_DURATION_RE.fullmatch(iso).groups())
  return ((d * 24 + h) * 60 + m) * 60 + s


def get_latest_youtube_videos(file='videos', channel_id=YOUTUBE_PPZ_CHANNEL_ID, max_results=3, key=YOUTUBE_API_KEY, duration='medium'):
  # La lista de subidas del canal (UC... -> UU...) refleja un vídeo nada más publicarse;
  # search tarda horas en indexarlo y el cron diario se lo saltaba (2026-11-26).
  uploads = 'UU' + channel_id[2:]
  lo, hi = DURATIONS[duration]
  print(f"Fetching {file} ({duration}) with max_results={max_results}")
  playlist = _get('playlistItems', key, playlistId=uploads, maxResults=50, part='snippet,contentDetails')
  ids = [i['contentDetails']['videoId'] for i in playlist.get('items', [])]
  details = _get('videos', key, id=','.join(ids), part='snippet,contentDetails,status')
  by_id = {v['id']: v for v in details.get('items', [])}

  items = []
  for vid in ids:  # orden de la lista de subidas: más reciente primero
    v = by_id.get(vid)
    if not v or v['status'].get('privacyStatus') != 'public':
      continue  # programados o privados también aparecen en la lista de subidas
    if not lo <= _seconds(v['contentDetails']['duration']) < hi:
      continue
    # Misma forma que devolvía search ({id: {videoId}, snippet}), que leen readme.py y LatestVideos
    items.append({'kind': 'youtube#searchResult', 'id': {'kind': 'youtube#video', 'videoId': vid}, 'snippet': v['snippet']})
    if len(items) == max_results:
      break
  print(f"{len(ids)} uploads checked, {len(items)} kept for {file}")

  with open('src/files/' + file + '.json', 'w') as f:
    f.write(json.dumps(items))
  print(f"Wrote {len(items)} items to {file}.json")


def get_latest_blog_posts(file='blog_posts', rss_url=BLOG_RSS_URL, max_results=10):
  """Obtiene los últimos artículos del blog desde el RSS"""
  response = urllib.request.urlopen(rss_url)
  rss_content = response.read()
  
  # Parsear el XML del RSS
  root = ET.fromstring(rss_content)
  
  # Buscar los items del RSS (artículos del blog)
  items = root.findall('.//item')
  
  blog_posts = []
  for item in items[:max_results]:
    post = {
      'title': item.find('title').text if item.find('title') is not None else '',
      'link': item.find('link').text if item.find('link') is not None else '',
      'description': item.find('description').text if item.find('description') is not None else '',
      'pubDate': item.find('pubDate').text if item.find('pubDate') is not None else '',
    }
    blog_posts.append(post)
  
  # Escribir en un fichero los artículos del blog
  with open('src/files/' + file + '.json', 'w') as f:
    f.write(json.dumps(blog_posts))
  
  return blog_posts


if __name__ == '__main__':
  get_latest_youtube_videos()
  get_latest_youtube_videos(file='podcasts',duration='long')
  get_latest_blog_posts()


