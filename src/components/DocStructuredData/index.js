import React, {useEffect, useState} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useActivePlugin, useDoc} from '@docusaurus/plugin-content-docs/client';
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

// Google Advertising Products en la Global Vendor List del TCF (incluye YouTube)
const GOOGLE_TCF_VENDOR = 755;

// ¿Ha aceptado el usuario las cookies de Google en el CMP (src/plugins/
// google-consent)? Se lee del API estándar del TCF; fuera del RGPD
// (gdprApplies false) no hace falta consentimiento. Si el CMP no llega a
// cargar (bloqueador de anuncios, AdSense desactivado), se queda en false.
function useGoogleConsent() {
  const [granted, setGranted] = useState(false);
  useEffect(() => {
    let listenerId;
    let retries = 20;
    let timer;
    const attach = () => {
      if (typeof window.__tcfapi !== 'function') {
        if (retries-- > 0) timer = setTimeout(attach, 500);
        return;
      }
      window.__tcfapi('addEventListener', 2, (tcData, success) => {
        if (!success || !tcData) return;
        listenerId = tcData.listenerId;
        if (tcData.gdprApplies === false) {
          setGranted(true);
        } else if (['tcloaded', 'useractioncomplete'].includes(tcData.eventStatus)) {
          setGranted(Boolean(
            tcData.purpose?.consents?.[1] && tcData.vendor?.consents?.[GOOGLE_TCF_VENDOR],
          ));
        }
      });
    };
    attach();
    return () => {
      clearTimeout(timer);
      if (listenerId !== undefined && typeof window.__tcfapi === 'function') {
        window.__tcfapi('removeEventListener', 2, () => {}, listenerId);
      }
    };
  }, []);
  return granted;
}

// Vídeo del frontmatter (`youtube: <id>`), iframe oficial cargado en diferido,
// más su VideoObject:
// - Sin consentimiento: youtube-nocookie (modo de privacidad mejorada). El
//   vídeo sigue en la página, que es lo que necesita Google para indexarlo.
// - Con consentimiento: youtube.com, que reconoce la sesión del usuario y su
//   YouTube Premium.
// Si el vídeo aún no está en youtube-videos.json (npm run update-videos), se
// pinta el iframe igualmente pero sin JSON-LD, que necesita fecha y duración.
function Video({id, fallbackTitle}) {
  const video = videos[id];
  const title = video?.title ?? fallbackTitle;
  const consent = useGoogleConsent();
  const host = consent ? 'www.youtube.com' : 'www.youtube-nocookie.com';
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
      <div className={styles.video}>
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
