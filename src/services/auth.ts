// src/services/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResponse {
  token: string;
}

export const login = async (email: string, password: string): Promise<string | null> => {
  // Simulação de API de login (substitua pela sua API real)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        const mockToken = 'seu_token_mock_fake'; // Crie um token mock
        resolve(mockToken); // Retorna o token mock
      } else {
        resolve(null); // Retorna null para login falho
      }
    }, 500); // Simula um pequeno atraso da API
  });
};

export const createUser = async (email: string, password: string): Promise<string | null> => {
  // Simulação de API de cadastro
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockToken = 'seu_token_mock_fake'; // Crie um token mock
      resolve(mockToken); // Retorna o token mock
    }, 500); // Simula um pequeno atraso da API
  });
};