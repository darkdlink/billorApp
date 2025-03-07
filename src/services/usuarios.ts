import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { API_URL } from '../config';

interface UserProfile {
  nome: string;
  email: string;
  telefone: string;
  fotoURL?: string;
}

export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const user = auth().currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado.');
    }

    const token = await user.getIdToken();
    const response = await axios.get(`${API_URL}/usuarios/${user.uid}`, {  // Rota para buscar o perfil do usuário
      headers: {
        Authorization: `Bearer ${token}`,  // Envie o token de autenticação
      },
    });
    return response.data; // Ajuste conforme a estrutura da sua API
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    throw error;
  }
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