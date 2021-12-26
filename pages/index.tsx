import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { useContext } from 'react';
import UserContext from '../context/UserContext'
import LoginPage from './account/login';

const Home: NextPage = () => {
  const { user } = useContext(UserContext);

  return (
        user ? <Layout><div>Usuario Logado!!!</div></Layout> : <LoginPage/>
  )
}

export default Home
