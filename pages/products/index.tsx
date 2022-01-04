import React from 'react'
import StandardPage from '../../components/StandardPage'
import Table from '../../components/Table';
import { api } from '../../config/index';
import { parseCookies } from '../../functions/functions';
import { useRouter } from 'next/router';
import Button from '../../components/form/Button';

const Products = ({products, model, reload}) => {
  const router = useRouter();

  if (reload) {
    router.push("/");
  }

  const data = products.map (product => { return { ...product, brand: product.brand.name, type: product.brand.brand_type.name, edit: <Button small value="Editar" type="button" handleClick={() => router.push(`/products/${product.id_product}`)} /> }})

  return (<StandardPage><Table headers={model} content={data} /></StandardPage>)
}

export const getServerSideProps = async ({req}) => {
  const {token} = parseCookies(req);

  const resp = await api.get('/product', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch((e) => {
    return {
      props: { reload: true }
    }
  });

  return {
    props: { products: resp.data.products, model: resp.data.model }
  }
}

export default Products
