import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from '../navigation/navigationTypes'; // Asegúrate de la ruta correcta

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

type EditProductScreenRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;

const EditProductScreen: React.FC = () => {
  const route = useRoute<EditProductScreenRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`EditProductScreen - Product ID from route: ${id}`);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.1.20:3000/api/products/${id}`);
        console.log('Product fetched for editing:', response.data);
        setProduct(response.data);
        setFormData({
          name: response.data.name,
          price: response.data.price.toString(),
          description: response.data.description,
          image: response.data.image,
        });
      } catch (error) {
        console.error('Error fetching product for editing:', error);
        setError('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    try {
      const updatedProduct = {
        id,
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
      };

      console.log('Submitting updated product:', updatedProduct);

      const response = await axios.put(`http://192.168.1.20:3000/api/products/${id}`, updatedProduct);
      console.log('Product updated successfully:', response.data);
      Alert.alert('Success', 'Product updated successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Products') }
      ]);
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
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
      <Text style={styles.title}>Edit Product</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={value => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={formData.price}
        onChangeText={value => handleChange('price', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={formData.description}
        onChangeText={value => handleChange('description', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={formData.image}
        onChangeText={value => handleChange('image', value)}
      />
      <Button title="Submit" onPress={handleSubmit} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default EditProductScreen;
