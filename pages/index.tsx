import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../context/UserContext'
import LoginPage from './account/login';
import Table from '../components/Table';
import StandardPage from '../components/StandardPage';

const Home: NextPage = () => {

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
        <StandardPage><Table content={content} headers={headers} /><Table content={content} headers={headers} checks selectedRows={selectedRows} /></StandardPage>
  )
}

export default Home
