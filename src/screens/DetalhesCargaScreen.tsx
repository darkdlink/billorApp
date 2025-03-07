import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import Card from '../components/Card';
import { mockCargas } from '../services/mockCargas'; // Importe os dados mock das cargas

// Define o tipo para os params da rota
type DetalhesCargaRouteProp = RouteProp<RootStackParamList, 'DetalhesCarga'>;

// Define o tipo para as props do componente
interface Props {
  route: DetalhesCargaRouteProp;
}

const DetalhesCargaScreen = ({ route }: Props) => {
  const { cargaId } = route.params;
  const navigation = useNavigation();

  // Encontra a carga com base no ID
  const carga = mockCargas.find(c => c.id === cargaId);

  if (!carga) {
    return (
      <View style={styles.container}>
        <Text>Carga não encontrada!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes da Carga</Text>
      <Card>
        <Text style={styles.itemTitle}>Origem: {carga.origem}</Text>
        <Text>Destino: {carga.destino}</Text>
        <Text>Data: {carga.data}</Text>
        <Text>Peso: {carga.peso} kg</Text>
        <Text>Tipo: {carga.tipo}</Text>
        <Text>Status: {carga.status}</Text>
        <Text>Descrição: {carga.descricao}</Text>
      </Card>
      <Button title="Voltar para Cargas" onPress={() => navigation.goBack()} />
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

export default DetalhesCargaScreen;