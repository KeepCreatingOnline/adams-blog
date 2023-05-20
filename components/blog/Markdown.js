import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'; // import the GFM plugin
import 'github-markdown-css';

export default function Markdown({ content }) {
  return (
    <ReactMarkdown 
      className="markdown-body" 
      children={content} 
      remarkPlugins={[gfm]} // add the plugin here
    />
  );
}
