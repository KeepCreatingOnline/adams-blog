import React from 'react';
import { unified } from 'unified';
import { remarkParse } from 'remark-parse';
import remark2react from 'remark-react';
import 'github-markdown-css';

export default function Markdown({ content }) {
  const result = unified().use(remarkParse).use(remark2react).processSync(content);
  const tree = result.result;

  return <div className="markdown-body">{tree}</div>;
}
