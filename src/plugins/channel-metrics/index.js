// Descarga en cada build las cifras del canal (suscriptores, vídeos,
// visualizaciones) del media kit y las estrellas del repositorio, y las expone
// como global data. Así cada despliegue deja las cifras al día en el HTML,
// sin esperar a que el navegador las pida.
const METRICS_URL =
  'https://raw.githubusercontent.com/pabpereza/mediakit/main/src/data/metrics.json';
const REPO_URL = 'https://api.github.com/repos/pabpereza/pabpereza';

// Últimas cifras conocidas, por si la descarga falla: el build no debe romperse por esto
const FALLBACK = {subscribers: '33.5K', videos: '252', views: '1.3M'};

async function fetchChannel() {
  try {
    const res = await fetch(METRICS_URL, {signal: AbortSignal.timeout(10000)});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const metrics = {
      subscribers: data.global?.totalProfessionals,
      videos: data.channel?.videoCount,
      views: data.channel?.viewCount,
    };
    // Si el JSON cambia de forma, cada cifra que falte cae a la última conocida
    for (const key of Object.keys(FALLBACK)) metrics[key] ??= FALLBACK[key];
    return metrics;
  } catch (error) {
    console.warn(`[channel-metrics] No se pudieron descargar las cifras (${error.message}); se usan las últimas conocidas.`);
    return FALLBACK;
  }
}

// Estrellas del repositorio en GitHub. `null` si la API no responde (su límite
// sin autenticar es bajo): quien lo pinta tiene que contar con que falte
async function fetchStars() {
  try {
    const headers = {Accept: 'application/vnd.github+json'};
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(REPO_URL, {headers, signal: AbortSignal.timeout(10000)});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()).stargazers_count ?? null;
  } catch (error) {
    console.warn(`[channel-metrics] No se pudieron leer las estrellas de GitHub (${error.message}).`);
    return null;
  }
}

module.exports = function channelMetrics() {
  return {
    name: 'channel-metrics',
    async loadContent() {
      const [channel, stars] = await Promise.all([fetchChannel(), fetchStars()]);
      return {...channel, stars};
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
};
