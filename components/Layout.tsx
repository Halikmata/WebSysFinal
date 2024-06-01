import React, { ReactNode } from 'react';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Container maxWidth="md">
    <NavBar />
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Your Profile</Typography>
      </Toolbar>
    </AppBar>
    {children}
  </Container>
);

export default Layout;