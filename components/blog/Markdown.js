import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';

export default function Markdown({ content }) {
  return (
    <ReactMarkdown 
      className="markdown-body" 
      children={content}
      remarkPlugins={[remarkGfm]} 
    />
  );
}
