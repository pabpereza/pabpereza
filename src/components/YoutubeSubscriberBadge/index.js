import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const METRICS_URL =
  'https://raw.githubusercontent.com/pabpereza/mediakit/main/src/data/metrics.json';
const SUBSCRIBE_URL = 'https://www.youtube.com/@Pabpereza?sub_confirmation=1';

export default function YoutubeSubscriberBadge() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(METRICS_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const subscribers = data?.global?.totalProfessionals;
        if (!cancelled && subscribers) {
          setCount(subscribers);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      href={SUBSCRIBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.badge}
    >
      <span className={styles.icon} />
      <span>Youtube</span>
      {count && <span className={styles.count}>{count}</span>}
    </a>
  );
}
