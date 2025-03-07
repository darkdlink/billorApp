import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

const MenuScreen = () => {
  const navigation = useNavigation<MenuScreenNavigationProp>();

  const navegarParaPerfil = () => {
    navigation.navigate('Perfil');
  };

  const navegarParaChat = () => {
    navigation.navigate('Chat');
  };

  const navegarParaCargas = () => {
    navigation.navigate('Cargas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Button title="Meu Perfil" onPress={navegarParaPerfil} />
      <Button title="Chat" onPress={navegarParaChat} />
      <Button title="Gerenciador de Cargas" onPress={navegarParaCargas} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MenuScreen;