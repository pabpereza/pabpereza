// Wrap (seguro según `docusaurus swizzle --list`) del heading de MDX: tras el
// h1 de cada doc se pinta el vídeo del frontmatter y su JSON-LD
import React from 'react';
import Heading from '@theme-original/MDXComponents/Heading';
import DocStructuredData from '@site/src/components/DocStructuredData';

export default function HeadingWrapper(props) {
  if (props.as !== 'h1') {
    return <Heading {...props} />;
  }
  return (
    <>
      <Heading {...props} />
      <DocStructuredData />
    </>
  );
}
