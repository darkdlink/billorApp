import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RouteParams { // Define os parâmetros esperados da rota
  cargaId: string;
}

// Vamos simular a busca dos detalhes da carga
const getCargaDetails = (id: string) => {
  // Substitua isso por uma chamada à API real
  return {
    id: id,
    origem: 'São Paulo',
    destino: 'Rio de Janeiro',
    peso: 1000,
    descricao: 'Carga de eletrônicos frágeis.',
  };
};


const DetalhesCargaScreen = ({ route }: { route: { params: RouteParams } }) => {
  const { cargaId } = route.params;
  const carga = getCargaDetails(cargaId); // Busca os detalhes da carga

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Carga</Text>
      <Text>ID: {carga.id}</Text>
      <Text>Origem: {carga.origem}</Text>
      <Text>Destino: {carga.destino}</Text>
      <Text>Peso: {carga.peso} kg</Text>
      <Text>Descrição: {carga.descricao}</Text>
      {/* Adicione aqui botões para aceitar/recusar a carga */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DetalhesCargaScreen;