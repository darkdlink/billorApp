import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

      <TouchableOpacity style={styles.button} onPress={navegarParaPerfil}>
        <Text style={styles.buttonText}>Meu Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navegarParaChat}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navegarParaCargas}>
        <Text style={styles.buttonText}>Gerenciador de Cargas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',  
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333333',  
  },
  button: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,  
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',  
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MenuScreen;