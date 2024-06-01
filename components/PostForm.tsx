import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const PostForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      authorId: 1, // Temporary hardcoded value; replace with actual user id
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      content: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('/api/posts', values);
        alert('Post created successfully');
      } catch (error) {
        console.error('Failed to create post', error);
        alert('Failed to create post');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="content"
            name="content"
            label="Content"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Create Post
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;