import React from 'react'
import StandardPage from '../../components/StandardPage'
import Table from '../../components/Table';
import { api } from '../../config/index';
import { parseCookies } from '../../functions/functions';
import { useRouter } from 'next/router';
import Button from '../../components/form/Button';

const Products = ({products, model, reload}) => {
  const router = useRouter();

  const data = products.map (product => { return { ...product, brand: product.brand.name, type: product.brand.brand_type.name, edit: <Button small value="Editar" type="button" handleClick={() => router.push(`/products/${product.id_product}`)} /> }})

  return (<StandardPage title="Produtos" keywords="Cadastro, produtos" description="Cadastro de Produtos">
            <Table headers={model} content={data} />
            <Button type="button" value="Novo Produto" handleClick={() => router.push('/products/new')} />
          </StandardPage>)
}

export const getServerSideProps = async ({req}) => {
  const {token} = parseCookies(req);

  const resp = await api.get('/product', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return {
    props: { products: resp.data.products, model: resp.data.model }
  }
}

export default Products
