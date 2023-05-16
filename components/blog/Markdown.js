import React from 'react';
import { unified } from 'unified';
import { remarkParse } from 'remark-parse';
import { remarkGfm } from 'remark-gfm'; // Use dynamic import here

const ReactMarkdown = dynamic(() => import('react-markdown'));
const remarkGfm = dynamic(() => import('remark-gfm'));

export default function Markdown({ content }) {
  const result = unified().use(remarkParse).use(remarkGfm).processSync(content);
  const html = result.toString();

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}