import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../context/UserContext'
import LoginPage from './account/login';
import Table from '../components/Table';

const Home: NextPage = () => {
  const { user } = useContext(UserContext);

  const content = [
       {
         col1: 'Hello',
         col2: 'World',
       },
       {
         col1: 'react-table',
         col2: 'rocks',
       },
       {
         col1: 'whatever',
         col2: 'you want',
       },
     ];

  const headers =  [
       {
         Header: 'Column 1',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
         Header: 'Column 2',
         accessor: 'col2',
       },
     ];

  let selectedRows = useRef();

  return (
        user ? <Layout><Table content={content} headers={headers} /><Table content={content} headers={headers} checks selectedRows={selectedRows} /></Layout> : <LoginPage/>
  )
}

export default Home
