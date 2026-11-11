// Deja los tres últimos artículos del blog, con su portada, en un módulo que
// la home importa (@generated/latest-posts/default/posts). Sale del contenido
// que ya ha cargado Docusaurus, así que va siempre al día con el repo.
const fs = require('fs');
const path = require('path');

const COUNT = 3;

module.exports = function latestPosts(context) {
  return {
    name: 'latest-posts',
    async allContentLoaded({allContent, actions}) {
      const posts = (allContent['docusaurus-plugin-content-blog']?.default?.blogPosts ?? [])
        .map((post) => post.metadata)
        .filter((meta) => !meta.unlisted && !meta.frontMatter?.draft)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, COUNT);

      const items = posts.map((meta) => {
        // `image` del frontmatter: una URL o una ruta relativa al artículo. La
        // relativa se importa con require() para que el build la procese
        const image = meta.frontMatter?.image;
        let imageCode = 'null';
        if (image && /^https?:\/\//.test(image)) {
          imageCode = JSON.stringify(image);
        } else if (image) {
          const file = path.resolve(path.dirname(meta.source.replace('@site', context.siteDir)), image);
          if (fs.existsSync(file)) imageCode = `require(${JSON.stringify(file)}).default`;
        }
        const data = JSON.stringify({
          title: meta.title,
          permalink: meta.permalink,
          description: meta.description ?? '',
          date: new Date(meta.date).toISOString(),
        });
        return `{...${data}, image: ${imageCode}}`;
      });

      await actions.createData('posts.js', `export default [\n  ${items.join(',\n  ')},\n];\n`);
    },
  };
};
