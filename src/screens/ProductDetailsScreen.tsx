import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from '../navigation/navigationTypes'; // Asegúrate de la ruta correcta

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`Product ID from route: ${id}`); // Log para verificar el ID

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.1.20:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.1.20:3000/api/products/${id}`);
      Alert.alert('Success', 'Product deleted successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Products') }
      ]);
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    }
  };

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text>{product.description}</Text>
      <Text>${product.price.toFixed(2)}</Text>
      <Button title="Edit Product" onPress={() => {
        console.log(`Navigating to EditProduct with ID: ${product._id}`);
        navigation.navigate('EditProduct', { id: product._id });
      }} />
      <Button title="Delete Product" onPress={() => 
        Alert.alert('Delete', 'Are you sure?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: handleDelete }
        ])
      } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});

export default ProductDetailsScreen;
