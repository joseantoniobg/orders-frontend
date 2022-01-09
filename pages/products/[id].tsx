import StandardPage from "../../components/StandardPage";
import { parseCookies, validateForm } from '../../functions/functions';
import { api, nextApi } from '../../config/index';
import Input from "../../components/form/Input";
import useForm from '../../hooks/useForm';
import FormSelect from "../../components/form/Select";
import { useState, useContext } from 'react';
import Button from "../../components/form/Button";
import UserContext from "../../context/UserContext";
import Error from "../../components/Error";
import { useRouter } from 'next/router';
import Modal from '../../components/Modal';

interface Product {
  id_product: number;
  bar_code: string;
  name: string;
  description: string;
  current_price: string;
  sale_price?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  brand: Brand;
}

interface Brand {
  id_brand: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  brand_type: Brandtype;
}

interface Brandtype {
  id_brand_type: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}

interface Props {
  id: string;
  product: Product;
  brands: Brand[],
  token: string,
}

const ProductPage = (props: Props) => {
  const { id, product, brands, token } = props;
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { logOut, error, setError, setLoading } = useContext(UserContext);

  const formFields = { barcode: useForm("text", true, product ? product.bar_code : ''),
                       name: useForm("text", true, product ? product.name : ''),
                       description: useForm("text", true, product ? product.description : ''),
                       currentPrice: useForm("money", true, product ? product.current_price : '0,00'),
                       salePrice: useForm("money", true, !product ? '0,00' : product.sale_price ?? product.current_price) };

  const formattedBrands = brands.map(b => { return { value: b.id_brand, label: b.name }});

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (!validateForm(formFields)) {
      return;
    }

    setLoading(true);

    setError(null);

    await nextApi.request({
      method: "post",
      url:'/api/product',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        method: product ? "patch" : "post",
        url:`/product${product ? `/${product.id_product}` : ''}`,
        data: {
          id_product: product && product.id_product,
          brand: { id_brand: selectedBrand ? selectedBrand.value : product.brand.id_brand },
          bar_code: formFields.barcode.value,
          name: formFields.name.value,
          description: formFields.description.value,
          current_price: formFields.currentPrice.moneyValue,
          sale_price: formFields.salePrice.moneyValue
        }
      }
    }).catch ((e) => {
      console.log(e);
      if (e.status === 403) {
        logOut();
      } else {
        setError('Algo inesperado aconteceu');
      }
    })

    setLoading(false);

    if (!error) {
      router.push('/products');
    }
  }

  return (
    <StandardPage>
      <div>
        {error && <Error error={error} setError={setError} />}
        <form>
          <div style={{ display: "flex", gap: "12px" }}>
            <FormSelect name="cmbBrand" label="Marca" setValue={setSelectedBrand} items={formattedBrands} selectedValue={product && product.brand.id_brand} leng="70%" />
            <Button type="button" value="Novo" handleClick={() => setShowModal(true)} leng="30%" />
          </div>
          <Input label="Código de Barras" name='barcode' type='text' {...formFields.barcode} />
          <Input label="Nome" name='name' type='text' {...formFields.name} />
          <Input label="Descrição" name='description' type='textarea' {...formFields.description} />
          <Input label="Preço" name='current_price' type='text' {...formFields.currentPrice} />
          <Input label="Preço Promocional" name='sale_price' type='text' {...formFields.salePrice} />
          <Button type="submit" value="Salvar" handleClick={handleSaveProduct} />
          <Modal title={'Image Preview'} show={showModal} onClose={() => setShowModal(false)}>
            <p>Teste modal</p>
          </Modal>
        </form>
      </div>
    </StandardPage>
  )
}

export const getServerSideProps = async ({ params: {id}, req }) => {
  const {token} = parseCookies(req);

  const brands = await api.get('/brand', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  if (id !== 'new') {
    const resp = await api.get('/product/' + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

     return {
      props: { id, product: resp.data, brands: brands.data }
    }
  }

  return {
    props: { id, brands: brands.data, token }
  }
}

export default ProductPage;
