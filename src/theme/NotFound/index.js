import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NotFound() {
  const iframeUrl = useBaseUrl('/404.html');

  return (
      <div style={{ width:'100%', height: '100vh', padding: '0rem' }}>
        <iframe
          src={iframeUrl}
          title="404 Jedi Archives"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
  );
}