import React from 'react';
import marked from 'marked';
import Prism from 'prismjs';

const renderer = new marked.Renderer();
renderer.code = (code, language) => {
  const validLanguage = !!(language && language.match(/^[\w-]+$/));
  const highlightedCode = validLanguage
    ? Prism.highlight(code, Prism.languages[language], language)
    : code;
  return `<pre class="language-${language}"><code>${highlightedCode}</code></pre>`;
};

const Markdown = ({ content }) => (
  <div
    className="markdown"
    dangerouslySetInnerHTML={{ __html: marked(content, { renderer }) }}
  />
);

export default Markdown;
