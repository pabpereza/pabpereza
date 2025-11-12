import React from 'react';
import NotFound from '@theme-original/NotFound';
import Layout from '@theme/Layout';

export default function NotFoundWrapper(props) {
  const html404 = './404.html';  

  return (
    <>
    <Layout title="404 – Archivo no encontrado">
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          padding: '0rem 0',
          height: '150vh',
        }}
      >
        <iframe
          src={html404}
          title="Página 404 – Archivos Jedi incompletos"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        />
      </div>
    </Layout>
    </>
  );
}
