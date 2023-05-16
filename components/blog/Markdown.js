import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

export default function Markdown({ content }) {
  return <ReactMarkdown className="markdown-body" children={content} />;
}
