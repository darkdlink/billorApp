// src/services/usuarios.ts
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { API_URL } from '../config';
import { mockProfile } from "./mockProfile"; // <== IMPORTANDO DADOS MOCKADOS

interface UserProfile {
  nome: string;
  email: string;
  telefone: string;
  fotoURL?: string;
}
// MODIFICANDO PARA BUSCAR OS DADOS MOCKADOS
export const fetchUserProfile = async (): Promise<UserProfile> => {
  // simulação de chamada à api
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProfile)
    }, 500)
  })
};

export const updateUserProfile = async (user: UserProfile): Promise<void> => {
  try {
    const authUser = auth().currentUser;
    if (!authUser) {
      throw new Error('Usuário não autenticado.');
    }

    const token = await authUser.getIdToken();
    await axios.put(`${API_URL}/usuarios/${authUser.uid}`, user, { // Rota para atualizar o perfil do usuário
      headers: {
        Authorization: `Bearer ${token}`, // Envie o token de autenticação
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    throw error;
  }
};

export const changePassword = async (newPassword: string): Promise<void> => {
  try {
    const user = auth().currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado.');
    }

    await user.updatePassword(newPassword);
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    throw error;
  }
};