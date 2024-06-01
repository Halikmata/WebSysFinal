import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Link from 'next/link';
import { useUser } from '../src/context/UserContext';

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href="/">Personal Profile</Link>
        </Typography>
        <Button color="inherit">
          <Link href="/profile">Profile</Link>
        </Button>
        <Button color="inherit">
          <Link href="/posts">Posts</Link>
        </Button>
        {user ? (
          <>
            <Typography variant="body1" style={{ marginRight: '1rem' }}>
              {user.name} ({user.email})
            </Typography>
            <Button color="inherit">
              <Link href="/logout">Log Out</Link>
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit">
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button color="inherit">
              <Link href="/login">Log In</Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
