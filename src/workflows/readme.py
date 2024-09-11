import json
import urllib.request
import os

def get_latest_youtube_videos(videos='videos'):
  # Read json file
  with open('src/files/'+videos+'.json', 'r') as f:
    videos = json.loads(f.read())
    return videos

def generate_youtube_html( video_id):
  return f"""
<a href='https://youtu.be/{video_id}' target='_blank'>
  <img height='140px' src='https://img.youtube.com/vi/{video_id}/mqdefault.jpg' />
</a>
"""

def generate_readme():
  template = open('./src/templates/README.md.tpl', 'r').read()

  videos = get_latest_youtube_videos()
  htlm = ''

  for video in videos:
    htlm += generate_youtube_html(video['id']['videoId'])

  
  readme = template.replace('{{ videos }}', htlm)

  podcasts = get_latest_youtube_videos(videos='podcasts')
  htlm = ''
  for podcast in podcasts:
    htlm += generate_youtube_html(podcast['id']['videoId'])
  readme = readme.replace('{{ podcast }}', htlm)

  with open('README.md', 'w') as f:
    f.write(readme)

if __name__ == '__main__':
  generate_readme()
