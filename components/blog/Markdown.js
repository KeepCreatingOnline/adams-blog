import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Markdown = ({ content }) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} children={content} />;
};

export default Markdown;
