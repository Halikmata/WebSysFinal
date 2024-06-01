import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const PostList: React.FC = () => {
  const { data, error } = useSWR('/api/posts', fetcher);

  if (error) return <div>Failed to load posts</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <List>
      {data.map((post: any, index: number) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText primary={post.title} secondary={post.content} />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default PostList;