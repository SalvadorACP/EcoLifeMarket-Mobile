import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.20:3000/api',
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product by ID', error);
    return null;
  }
};

export const addProduct = async (product: any) => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Failed to add product', error);
  }
};

export const updateProduct = async (id: string, product: any) => {
  try {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Failed to update product', error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete product', error);
  }
};
