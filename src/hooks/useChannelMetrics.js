import {usePluginData} from '@docusaurus/useGlobalData';

// Cifras del canal descargadas en el build por el plugin channel-metrics
export default function useChannelMetrics() {
  return usePluginData('channel-metrics');
}
