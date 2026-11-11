import React from 'react';
import useChannelMetrics from '@site/src/hooks/useChannelMetrics';
import styles from './styles.module.css';

const SUBSCRIBE_URL = 'https://www.youtube.com/@Pabpereza?sub_confirmation=1';

export default function YoutubeSubscriberBadge() {
  const metrics = useChannelMetrics();

  return (
    <a
      href={SUBSCRIBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.badge}
    >
      <span className={styles.icon} />
      <span>YouTube</span>
      <span className={styles.count}>{metrics.subscribers}</span>
    </a>
  );
}
