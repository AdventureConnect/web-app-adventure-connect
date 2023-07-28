import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
        console.log('check auth in private route component rat');
      try {
        const response = await axios.get('/api/auth', { withCredentials: true });
        console.log('/auth endpoint response is:', response);
        if (response.status === 200) setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);


  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

//   useEffect(() => {
//     if (isAuthenticated === false) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/'/>
  )
  
};

export default PrivateRoute;

