import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from '../components/Layout';
import { useUser } from '../src/context/UserContext';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const { setUser } = useUser();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/auth', values);
        setUser(response.data.user); // Assuming the response contains user details in `response.data.user`
        alert('Logged in successfully');
        router.push('/profile'); // Redirect to homepage or another page
      } catch (error) {
        console.error('Failed to log in', error);
        alert('Failed to log in');
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
            <Button color="primary" variant="contained" fullWidth type="submit">
              Log In
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default Login;