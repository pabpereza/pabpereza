import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import videos from '../../files/videos.json';


const VideoList = videos.map(video => (
  {
  videoid: video.id.videoId,
  title: video.snippet.title.substring(0, 100),
  description: video.snippet.description.substring(0, 100),
}));

// Let just 3 videos
VideoList.length = 3;

function Video({videoid, title,description }) {
  return (
    <div className={clsx('col col--4')}>
        <a href={`https://youtu.be/${videoid}`} target='_blank'>
          <div className="text--center featureImg">
              <img width='90%' src={`https://img.youtube.com/vi/${videoid}/maxresdefault.jpg`} />
          </div>
          <div className="text--center padding-horiz--md">
            <Heading as="h3" >{title}...</Heading>
             {/* <p>{description}...</p> */}
          </div>
        </a>
    </div>
  );
}


export default function LastVideos( YOUTUBE_API_KEY) {
 
  return (
    <section className={styles.videos}>
      <div className="container">
        <h2>Últimos vídeos de Youtube</h2>
        <p></p>
        <div className="row">
          {VideoList.map((props, idx) => (
            <Video key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}