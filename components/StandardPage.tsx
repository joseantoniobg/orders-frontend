import React from 'react'
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Layout from './Layout';
import LoginPage from '../pages/account/login';

const StandardPage = ({title, keywords, description, children}) => {
  const { user } = useContext(UserContext);

  return (
        user ? <Layout title={title} keywords={keywords} description={description}>{children}</Layout> : <LoginPage/>
  )
}

StandardPage.defaultProps = {
  title: 'Sistema de Pedidos',
  keywords: 'pedidos, restaurantes, ponta a ponta, processos',
  description: 'Controle seu negócio de ponta a ponta'
}

export default StandardPage
