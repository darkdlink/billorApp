import auth from '@react-native-firebase/auth';

export const login = async (email: string, password: string): Promise<string | null> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);

    const token = await userCredential.user.getIdToken();
    return token;

  } catch (error: any) {
    console.error('Erro ao fazer login com Firebase:', error.code, error.message);
    switch (error.code) {
      case 'auth/user-not-found':
        console.log('Usuário não encontrado');
        break;
      case 'auth/wrong-password':
        console.log('Senha incorreta');
        break;
      default:
        console.log('Erro desconhecido:', error.code);
    }
    return null;
  }
};

export const createUser = async (email: string, password: string): Promise<string | null> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    const token = await userCredential.user.getIdToken();
    return token;

  } catch (error: any) {
    console.error('Erro ao criar usuário com Firebase:', error.code, error.message);

    return null;
  }
};