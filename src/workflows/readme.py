import json
import urllib.request
import os

def get_latest_youtube_videos(videos='videos'):
  # Read json file
  with open('src/files/'+videos+'.json', 'r') as f:
    videos = json.loads(f.read())
    return videos

def get_latest_blog_posts():
  # Read json file with blog posts
  with open('src/files/blog_posts.json', 'r') as f:
    posts = json.loads(f.read())
    return posts

def generate_youtube_html( video_id):
  return f"""
<a href='https://youtu.be/{video_id}' target='_blank'>
  <img height='140px' src='https://img.youtube.com/vi/{video_id}/mqdefault.jpg' />
</a>
"""

def generate_blog_post_html(title, link):
  return f"- [{title}]({link})\n"

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

  # Generar lista de artículos del blog
  posts = get_latest_blog_posts()
  posts_html = ''
  for post in posts:
    posts_html += generate_blog_post_html(post['title'], post['link'])
  readme = readme.replace('{{ posts }}', posts_html)

  with open('README.md', 'w') as f:
    f.write(readme)

if __name__ == '__main__':
  generate_readme()
