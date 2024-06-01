import React, { useEffect } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useSWR from 'swr';
import { useUser } from '../src/context/UserContext';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const ProfileForm: React.FC = () => {
  const { user } = useUser();
  const { data, error } = useSWR(user ? `/api/users/${user.id}` : null, fetcher); // Adjust the endpoint based on your API
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      bio: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      bio: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`/api/users/${user?.id}`, values); // Change POST to PUT for update
        alert('Profile updated successfully');
      } catch (error) {
        console.error('Failed to update profile', error);
        alert('Failed to update profile');
      }
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name || '',
        email: data.email || '',
        bio: data.bio || '',
      });
    }
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
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
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;