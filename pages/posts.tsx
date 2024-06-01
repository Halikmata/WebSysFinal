import React from 'react';
import Layout from '../components/Layout';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const Posts: React.FC = () => (
  <Layout>
    <PostForm />
    <PostList />
  </Layout>
);

export default Posts;