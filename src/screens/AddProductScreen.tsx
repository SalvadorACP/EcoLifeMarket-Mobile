import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addProduct } from '../services/api'; // Importa el servicio API

const AddProductScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

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

    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image,
    };

    try {
      await addProduct(newProduct); // Usa el servicio API
      Alert.alert('Success', 'Product added successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Products') }
      ]);
    } catch (error) {
      setError('Failed to save product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
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

export default AddProductScreen;
