import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect, StackNavigationProp } from '@react-navigation/native';
import ProductItem from '../components/ProductItem';
import axios from 'axios';
import { RootStackParamList } from '../navigation/navigationTypes'; // Asegúrate de la ruta correcta

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

type ProductsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Products'>;

const ProductsScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<ProductsScreenNavigationProp>();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://192.168.1.20:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const handleProductPress = (id: string) => {
    console.log(`Navigating to ProductDetails with ID: ${id}`);
    navigation.navigate('ProductDetails', { id });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => handleProductPress(item._id)}>
      <ProductItem id={item._id} name={item.name} price={item.price} image={item.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  error: {
    color: 'red',
  },
});

export default ProductsScreen;
