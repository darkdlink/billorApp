import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native'; // Importe ActivityIndicator
import auth from '@react-native-firebase/auth'; // Importe o módulo de autenticação do Firebase
import { fetchUserProfile, updateUserProfile, changePassword } from '../services/usuarios'; // Suponha um arquivo de serviço
import ButtonComponent from '../components/Button';
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

interface UserProfile {
  nome: string;
  email: string;
  telefone: string;
  fotoURL?: string;
}

const PerfilScreen = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
   const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      setLoading(true);
      try {
        const data = await fetchUserProfile(); // Buscar os dados do usuário da API
        setUser(data);
      } catch (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar o perfil do usuário. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Aqui você chamaria a função para atualizar o perfil do usuário na API
      if (user) {
        await updateUserProfile(user);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil do usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil. Tente novamente mais tarde.');
    }
  };

  const handleChangePassword = async () => {
    try {
      // Aqui você chamaria a função para alterar a senha do usuário na API
      await changePassword(newPassword);
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setNewPassword('');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao alterar a senha. Tente novamente mais tarde.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Desconectar do Firebase
      // Redirecionar para a tela de login (usando navigation.replace)
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer logout. Tente novamente mais tarde.');
    }
  };

     const takePhoto = async () => {
        const result = await launchCamera({ mediaType: 'photo', quality: 0.5 });

        if (!result.didCancel && result.assets) {
          setImage(result.assets[0].uri || null);
        }
      };

      const chooseFromLibrary = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.5 });

        if (!result.didCancel && result.assets) {
          setImage(result.assets[0].uri || null);
        }
      };

    const handleUploadImage = async() => {

    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : user ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={user.nome}
            onChangeText={text => setUser({ ...user, nome: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={user.email}
            onChangeText={text => setUser({ ...user, email: text })}
            keyboardType="email-address"
            editable={false}  // Email não pode ser alterado
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={user.telefone}
            onChangeText={text => setUser({ ...user, telefone: text })}
            keyboardType="phone-pad"
          />
              {image && (
                <Image source={{ uri: image }} style={styles.image} />
              )}
              <Button title="Tirar Foto" onPress={takePhoto} />
              <Button title="Escolher da Galeria" onPress={chooseFromLibrary} />
               <Button title="Upload Image" onPress={handleUploadImage} />

          <TextInput
            placeholder="Nova Senha"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <ButtonComponent title="Atualizar Perfil" onPress={handleUpdateProfile} />
          <ButtonComponent title="Alterar Senha" onPress={handleChangePassword} />
          <ButtonComponent title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Erro ao carregar perfil.</Text>
      )}
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
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  image: {  // Adicione este estilo
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default PerfilScreen;