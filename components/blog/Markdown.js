import React from 'react';
import marked from 'marked';
import Prism from 'prismjs';

const Markdown = ({ content }) => {
  const renderer = new marked.Renderer();

  renderer.code = (code, language) => {
    const validLanguage = Prism.languages[language] ? language : 'markup';
    const highlightedCode = Prism.highlight(
      code,
      Prism.languages[validLanguage],
      validLanguage
    );
    return `<pre class="language-${validLanguage}"><code>${highlightedCode}</code></pre>`;
  };

  const markup = content ? marked(content, { renderer }) : '';

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
};

export default Markdown;
