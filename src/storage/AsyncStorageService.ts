import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const PRODUCTS_KEY = 'products';

// Función para obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsJSON = await AsyncStorage.getItem(PRODUCTS_KEY);
    return productsJSON ? JSON.parse(productsJSON) : [];
  } catch (error) {
    console.error('Failed to fetch products', error);
    return [];
  }
};

// Función para obtener un producto por ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const products = await getProducts();
    const product = products.find(p => p.id === id);
    return product || null;
  } catch (error) {
    console.error('Failed to fetch product by ID', error);
    return null;
  }
};

// Función para agregar un nuevo producto
export const addProduct = async (product: Product): Promise<void> => {
  try {
    const products = await getProducts();
    products.push(product);
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Failed to add product', error);
  }
};

// Función para actualizar un producto
export const updateProduct = async (updatedProduct: Product): Promise<void> => {
  try {
    let products = await getProducts();
    products = products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Failed to update product', error);
  }
};

// Función para eliminar un producto
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    let products = await getProducts();
    products = products.filter(product => product.id !== id);
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Failed to delete product', error);
  }
};
