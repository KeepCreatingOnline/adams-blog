import React from 'react';
import { unified } from 'unified';
import { remarkParse } from 'remark-parse';
import dynamic from 'next/dynamic';
import remarkGfmPlugin from 'remark-gfm'; // Updated import statement

const ReactMarkdown = dynamic(() => import('react-markdown').then((mod) => mod.default));
const remarkGfm = dynamic(() => import('remark-gfm').then((mod) => mod.remarkGfm)); // If required, update this line too

export default function Markdown({ content }) {
  const result = unified().use(remarkParse).use(remarkGfmPlugin).processSync(content);
  const html = result.toString();

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
