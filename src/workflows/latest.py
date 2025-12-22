import json
import urllib.request
import os

YOUTUBE_PPZ_CHANNEL_ID = 'UCGfKISiN7usAdxvcGivm_OA'
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY') 

def get_latest_youtube_videos(file='videos',channel_id=YOUTUBE_PPZ_CHANNEL_ID, max_results=3, key=YOUTUBE_API_KEY, duration='medium'):
  url = f"https://www.googleapis.com/youtube/v3/search?channelId={channel_id}&maxResults={max_results}&key={key}&order=date&type=video&videoDuration={duration}&part=snippet"
  response = urllib.request.urlopen(url)
  videos = json.loads(response.read())


  # Escribir en un fichero los videos
  with open('src/files/' + file +'.json', 'w') as f:
    f.write(json.dumps(videos['items']))


if __name__ == '__main__':
  get_latest_youtube_videos()
  get_latest_youtube_videos(file='podcasts',duration='long')


