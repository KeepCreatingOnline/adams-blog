import React from 'react';
import Markdown from './Markdown';
import format from 'date-fns/format';
import { blogPath, defaultSocialImage } from '../../settings/blog';
import categories from '../../settings/categories';
import Main from '../Main';
import PostData from './PostData';
import { ChevronRight } from '../svg/Icons';

function Post({ post }) {
  return (
    <Main
      {...post}
      image={post.image || defaultSocialImage}
      head={
        <React.Fragment>
          <link href="/css/prism.min.css" rel="stylesheet" />
          <PostData {...post} />
        </React.Fragment>
      }
    >
      <div className="p-5">
        <div className="max-w-3xl mx-auto my-10">
          <p className="py-5 flex items-center font-semibold text-lg md:text-xl">
            <a href={blogPath || '/'}>Blog</a>
            {post.categoryId && <ChevronRight width="20" height="20" />}
            {post.categoryId && (
              <a href={`${blogPath}/${post.categoryId}`}>
                {categories[post.categoryId].name}
              </a>
            )}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug md:leading-snug lg:leading-snug">
            {post.title}
          </h1>
          <p className="md:text-lg py-10 prose dark:prose-dark">
            {post.updated ? 'Updated' : 'Written'} {createAuthorLink(post.authorId)} on{' '}
            {format(post.updated || post.published, 'MMMM do, yyyy')}
          </p>
        </div>
        <div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg lg:text-xl font-semibold">{post.description}</p>
            <Markdown content={post.content} className="prose lg:prose-lg dark:prose-dark max-w-none my-10" />
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Post;
