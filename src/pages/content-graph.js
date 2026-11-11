import Layout from '@theme/Layout';
import ContentGraph from '@site/src/components/ContentGraph';
import styles from './content-graph.module.css';

export default function ContentGraphPage() {
  return (
    <Layout
      title="Mapa de contenido"
      description="Mapa interactivo de los cursos y artículos de pabpereza.dev y de cómo enlazan entre sí. Busca una página, filtra por curso y salta a lo que te interese."
      noFooter>
      <main className={styles.page}>
        <h1 className="ppz-sr">Mapa de contenido</h1>
        <ContentGraph />
      </main>
    </Layout>
  );
}
