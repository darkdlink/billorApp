import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResponse {
  token: string;
}

export const login = async (email: string, password: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        const mockToken = 'seu_token_mock_fake'; 
        resolve(mockToken); 
      } else {
        resolve(null); 
      }
    }, 500); 
  });
};

export const createUser = async (email: string, password: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockToken = 'seu_token_mock_fake'; 
      resolve(mockToken); 
    }, 500); 
  });
};