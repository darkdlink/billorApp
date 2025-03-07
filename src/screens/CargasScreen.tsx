// src/screens/CargasScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchCargas } from '../services/cargas'; // Suponha um arquivo de serviço
import Card from '../components/Card';

// Define a interface para uma carga
interface Carga {
  id: string;
  origem: string;
  destino: string;
  data: string;
  peso: number;
  tipo: string;
}

const CargasScreen = () => {
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCargas = async () => {
      setLoading(true);
      try {
        const data = await fetchCargas();
        setCargas(data);
      } catch (error) {
        console.error('Erro ao buscar cargas:', error);
        // Lidar com o erro (ex: exibir mensagem ao usuário)
      } finally {
        setLoading(false);
      }
    };

    loadCargas();
  }, []);

  const renderItem = ({ item }: { item: Carga }) => (
    <Card>
      <Text style={styles.itemTitle}>Origem: {item.origem}</Text>
      <Text>Destino: {item.destino}</Text>
      <Text>Data: {item.data}</Text>
      <Text>Peso: {item.peso} kg</Text>
      <Text>Tipo: {item.tipo}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cargas Disponíveis</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={cargas}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CargasScreen;