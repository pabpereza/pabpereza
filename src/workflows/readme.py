import json
import urllib.request
import os

LATEST_ARTICLES= 5,
MAX_VIDEOS = 5,

YOUTUBE_PPZ_CHANNEL_ID = 'UCGfKISiN7usAdxvcGivm_OA'
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY') 

def get_latest_youtube_videos(channel_id=YOUTUBE_PPZ_CHANNEL_ID, max_results=5, key=YOUTUBE_API_KEY):
  url = f"https://www.googleapis.com/youtube/v3/search?channelId={channel_id}&maxResults={max_results}&key={key}&order=date&type=video&videoDuration=medium&part=snippet"
  response = urllib.request.urlopen(url)
  videos = json.loads(response.read())
  return videos['items']


def generate_youtube_html( video_id):
  return f"""
<a href='https://youtu.be/{video_id}' target='_blank'>
  <img width='19%' src='https://img.youtube.com/vi/{video_id}/mqdefault.jpg' />
</a>
"""

def generate_readme():
  template = open('./src/templates/README.md.tpl', 'r').read()

  videos = get_latest_youtube_videos()
  htlm = ''

  for video in videos:
    htlm += generate_youtube_html(video['id']['videoId'])
  
  readme = template.replace('{{ videos }}', htlm)

  with open('README.md', 'w') as f:
    f.write(readme)

if __name__ == '__main__':
  generate_readme()
