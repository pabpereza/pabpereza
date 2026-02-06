import json
import urllib.request
import os
import xml.etree.ElementTree as ET

YOUTUBE_PPZ_CHANNEL_ID = 'UCGfKISiN7usAdxvcGivm_OA'
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
BLOG_RSS_URL = 'https://pabpereza.dev/blog/rss.xml'

def get_latest_youtube_videos(file='videos',channel_id=YOUTUBE_PPZ_CHANNEL_ID, max_results=3, key=YOUTUBE_API_KEY, duration='medium'):
  url = f"https://www.googleapis.com/youtube/v3/search?channelId={channel_id}&maxResults={max_results}&key={key}&order=date&type=video&videoDuration={duration}&part=snippet"
  print(f"Fetching {file} with max_results={max_results}")
  response = urllib.request.urlopen(url)
  videos = json.loads(response.read())
  
  # Truncar a max_results por si la API devuelve más
  items = videos.get('items', [])[:max_results]
  print(f"API returned {len(videos.get('items', []))} items, truncated to {len(items)} for {file}")

  # Escribir en un fichero los videos
  with open('src/files/' + file +'.json', 'w') as f:
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


