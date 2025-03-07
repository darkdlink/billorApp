import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { fetchCargas } from '../services/cargas';
import Card from '../components/Card';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Carga {
  id: string;
  origem: string;
  destino: string;
  data: string;
  peso: number;
  tipo: string;
  status: 'disponivel' | 'em_andamento' | 'concluida';
}

const CargasScreen = () => {
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'disponivel' | 'em_andamento' | 'concluida' | 'todos'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const loadCargas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCargas({ status: statusFilter, searchTerm: searchTerm });
      setCargas(data);
    } catch (error) {
      console.error('Erro ao buscar cargas:', error);
      // Lidar com o erro (ex: exibir mensagem ao usuário)
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    loadCargas();
  }, [loadCargas]); // loadCargas como dependência

 const handleCargaPress = (cargaId: string) => {
    navigation.navigate('DetalhesCarga', { cargaId });
  };

  const renderItem = ({ item }: { item: Carga }) => (
     <TouchableOpacity onPress={() => handleCargaPress(item.id)}>
    <Card>
      <Text style={styles.itemTitle}>Origem: {item.origem}</Text>
      <Text>Destino: {item.destino}</Text>
      <Text>Data: {item.data}</Text>
      <Text>Peso: {item.peso} kg</Text>
      <Text>Tipo: {item.tipo}</Text>
      <Text>Status: {item.status}</Text>
    </Card>
     </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cargas Disponíveis</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, statusFilter === 'todos' && styles.filterButtonActive]}
          onPress={() => setStatusFilter('todos')}
        >
          <Text>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, statusFilter === 'disponivel' && styles.filterButtonActive]}
          onPress={() => setStatusFilter('disponivel')}
        >
          <Text>Disponível</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, statusFilter === 'em_andamento' && styles.filterButtonActive]}
          onPress={() => setStatusFilter('em_andamento')}
        >
          <Text>Em Andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, statusFilter === 'concluida' && styles.filterButtonActive]}
          onPress={() => setStatusFilter('concluida')}
        >
          <Text>Concluída</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar por ID ou Destino"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default CargasScreen;