import json
import urllib.request

LATEST_ARTICLES= 5,
MAX_VIDEOS = 5,
LATEST_INSTAGRAM= 5

YOUTUBE_PPZ_CHANNEL_ID = 'UCGfKISiN7usAdxvcGivm_OA'
YOUTUBE_API_KEY = 'AIzaSyABYpsjuqrdwXH83Y5YunvJb02yo7dxMsw'

def get_latest_youtube_videos(channel_id=YOUTUBE_PPZ_CHANNEL_ID, max_results=5, key=YOUTUBE_API_KEY):
  url = f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={channel_id}&maxResults={max_results}&key={key}"
  print(url)
  response = urllib.request.urlopen(url)
  videos = json.loads(response.read())
  return videos['items']


def generate_youtube_html(title, video_id):
  return f"""
<a href='https://youtu.be/{video_id}' target='_blank'>
  <img width='30%' src='https://img.youtube.com/vi/{video_id}/mqdefault.jpg' alt='{title}' />
</a>
"""

def generate_readme():
  template = open('./src/workflows/README.md.tpl', 'r').read()

  videos = get_latest_youtube_videos()

  latest_youtube_videos = ''.join([
    generate_youtube_html(video['snippet']['title'], video['snippet']['resourceId']['videoId'])
    for video in videos
  ])

  new_markdown = template.replace(PLACEHOLDERS['LATEST_YOUTUBE'], latest_youtube_videos)

  with open('README.md', 'w') as file:
    file.write(new_markdown)

if __name__ == '__main__':
  generate_readme()
