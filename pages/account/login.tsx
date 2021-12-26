import { FaUser } from 'react-icons/fa';
import {useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/AuthForm.module.scss';
import UserContext from '../../context/UserContext';
import Input from '../../components/form/Input';
import Error from '../../components/Error';
import Button from '../../components/form/Button';
import useForm from '../../hooks/useForm';
import { validateForm } from '../../functions/functions';

export default function LoginPage() {

  const formFields = {
    login: useForm('text', true),
    password: useForm('password', true)
  }

  const { logIn, loading, error, setError } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formFields)) {
      return;
    }
    logIn({ login: formFields.login.value, password: formFields.password.value })
  }

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <Error error={error} setError={setError} />
        <h1>
          <FaUser /> Log In
        </h1>
        <form onSubmit={handleSubmit}>
           <Input label="Login" name='login' type='text' {...formFields.login} />
           <Input label="Senha" name='password' type='password' {...formFields.password} />
           <Button type='submit' value='Entrar' />
        </form>
      </div>
    </Layout>
  )
}
