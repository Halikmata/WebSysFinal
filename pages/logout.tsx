import React from 'react';
import { Button } from '@material-ui/core';

const handleLogout = () => {
  // Clear authentication token from local storage or cookie
  localStorage.removeItem('authToken');
  // Redirect to the login page or home page
  window.location.href = '/login'; // Example redirect to the login page
};

const LogoutButton: React.FC = () => (
  <Button color="inherit" onClick={handleLogout}>
    Logout
  </Button>
);

export default LogoutButton;