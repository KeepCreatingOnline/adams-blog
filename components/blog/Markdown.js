import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

export default function Markdown({ content }) {
  const [remarkGfm, setRemarkGfm] = useState(null);

  useEffect(() => {
    import('remark-gfm').then((module) => {
      setRemarkGfm(module.default);
    });
  }, []);

  return (
    remarkGfm ? 
    <ReactMarkdown 
      className="markdown-body" 
      children={content}
      remarkPlugins={[remarkGfm]} 
    />
    : <div>Loading...</div>
  );
}
