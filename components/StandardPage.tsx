import React from 'react'
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Layout from './Layout';
import LoginPage from '../pages/account/login';

const StandardPage = ({children}) => {
  const { user } = useContext(UserContext);

  return (
        user ? <Layout>{children}</Layout> : <LoginPage/>
  )
}

export default StandardPage
