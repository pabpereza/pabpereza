import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useActivePlugin, useDoc} from '@docusaurus/plugin-content-docs/client';
import {useCookieConsent} from '@site/src/components/CookieConsent/consent';
import videos from '@site/src/data/youtube-videos.json';
import styles from './styles.module.css';

const PABLO = {'@id': 'https://pabpereza.dev/#pablo'};

function JsonLd({data}) {
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}

// Vídeo del frontmatter (`youtube: <id>`), iframe oficial cargado en diferido,
// más su VideoObject:
// - Sin consentimiento: youtube-nocookie (modo de privacidad mejorada). El
//   vídeo sigue en la página, que es lo que necesita Google para indexarlo.
// - Con consentimiento (aviso de cookies propio): youtube.com, que reconoce la sesión del usuario y su
//   YouTube Premium.
// Si el vídeo aún no está en youtube-videos.json (npm run update-videos), se
// pinta el iframe igualmente pero sin JSON-LD, que necesita fecha y duración.
function Video({id, fallbackTitle}) {
  const video = videos[id];
  const title = video?.title ?? fallbackTitle;
  const consent = useCookieConsent();
  const host = consent === 'granted' ? 'www.youtube.com' : 'www.youtube-nocookie.com';
  return (
    <>
      {video && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: video.title,
            description: video.description || title,
            thumbnailUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
            uploadDate: video.publishedAt,
            duration: video.duration,
            embedUrl: video.embeddable === false ? undefined : `https://www.youtube.com/embed/${id}`,
            contentUrl: `https://www.youtube.com/watch?v=${id}`,
            inLanguage: 'es',
            author: PABLO,
          }}
        />
      )}
      <div className={`ppz-glare ppz-glare--soft ${styles.video}`}>
        {video?.embeddable === false ? (
          // Inserción desactivada en YouTube: miniatura enlazada al vídeo
          <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener">
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              alt={title}
              loading="lazy"
            />
          </a>
        ) : (
          <iframe
            key={host}
            src={`https://${host}/embed/${id}`}
            title={title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
    </>
  );
}

// Los README de cada curso son la portada del curso: se declaran como Course
// El nombre sale del h1 ("Curso Docker"), no del title, que en algunos README
// es solo el emoji y la tecnología ("🐳 Docker")
function Course({frontMatter, metadata, contentTitle}) {
  const {siteConfig} = useDocusaurusContext();
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: contentTitle ?? metadata.title,
        description: frontMatter.description ?? metadata.description,
        url: `${siteConfig.url}${metadata.permalink}`,
        inLanguage: 'es',
        isAccessibleForFree: true,
        keywords: frontMatter.keywords?.join(', '),
        image: frontMatter.image,
        provider: PABLO,
        author: PABLO,
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          instructor: PABLO,
        },
        offers: {
          '@type': 'Offer',
          category: 'Free',
          price: 0,
          priceCurrency: 'EUR',
        },
      }}
    />
  );
}

function DocExtras() {
  const {frontMatter, metadata, contentTitle} = useDoc();
  const isCourse = /^cursos\/[^/]+\/README$/.test(metadata.id);
  return (
    <>
      {isCourse && (
        <Course frontMatter={frontMatter} metadata={metadata} contentTitle={contentTitle} />
      )}
      {frontMatter.youtube && (
        <Video id={String(frontMatter.youtube)} fallbackTitle={metadata.title} />
      )}
    </>
  );
}

// El h1 de MDX también se usa en el blog y en las páginas sueltas, donde no
// hay DocProvider y useDoc() fallaría: solo se activa dentro de las docs
export default function DocStructuredData() {
  const plugin = useActivePlugin();
  return plugin ? <DocExtras /> : null;
}
