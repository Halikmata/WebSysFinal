import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Layout from '../components/Layout';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Index: React.FC = () => {
  const { data, error } = useSWR('/api/users', fetcher);

  if (error) return <div>Failed to load user details</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <h1>Welcome, {data.name}</h1>
      <p>Email: {data.email}</p>
      <p>Bio: {data.bio}</p>
    </Layout>
  );
};

export default Index;