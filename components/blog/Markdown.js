import React from 'react';
import marked from 'marked';
import Prism from 'prismjs';

const Markdown = ({ content }) => {
  const renderer = new marked.Renderer();

  renderer.image = (href, title, text) => {
    return `<img src="${href}" alt="${text}" />`;
  };

  const markup = content ? marked(content, { renderer }) : '';

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
};

export default Markdown;
