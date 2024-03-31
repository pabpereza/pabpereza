import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Desarrollo',
    path: require('@site/static/img/development.png').default
  },
  {
    title: 'DevOps',
    path: require('@site/static/img/devops.png').default
  },
  {
    title: 'Seguridad',
    path: require('@site/static/img/security.png').default
  },
];

function Feature({path, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center featureImg">
        <img height="200px" src={path} alt={description} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2>Divulgo principalmente sobre</h2>
        <p>Creo que enseñando es cuando más he afianzado mis conocimientos, además de ser vocacional claro esta. Actualmente trabajo profesionalmente como SecDevOps, lo cual, me permite combinar mis grandes pasiones dentro de la informática, el desarrollo de software y DevOps.</p>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
