import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from '../components/Layout';

const Signup: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      bio: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      bio: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('/api/users', values);
        alert('Account created successfully');
      } catch (error) {
        console.error('Failed to create account', error);
        alert('Failed to create account');
      }
    },
  });

  return (
    <Layout>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="bio"
              name="bio"
              label="Bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default Signup;