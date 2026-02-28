import React from 'react';
import Layout from '@theme/Layout';
import ContentGraphWrapper from '@site/src/components/ContentGraph/ContentGraphWrapper';

export default function ContentGraphPage() {
  return (
    <Layout
      title="Diagrama de Contenido"
      description="Vista interactiva minimalista del contenido relacionado por enlaces internos - Cursos y Blog de Pabpereza"
    >
      <div style={{ width: '100%', height: '100vh', margin: 0, padding: '20px 0' }}>
        <ContentGraphWrapper isFullPage={true} />
      </div>
    </Layout>
  );
}
