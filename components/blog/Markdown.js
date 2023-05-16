import React from 'react';
import { unified } from 'unified';
import { remarkParse } from 'remark-parse';
import dynamic from 'next/dynamic/dist/next-dynamic';
import { remarkGfm } from 'remark-gfm';

const ReactMarkdown = dynamic(() => import('react-markdown').then((mod) => mod.default));
const remarkGfmPlugin = dynamic(() => import('remark-gfm').then((mod) => mod.remarkGfm));

export default function Markdown({ content }) {
  const result = unified().use(remarkParse).use(remarkGfmPlugin).processSync(content);
  const html = result.toString();

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
