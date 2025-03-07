// src/types/navigation.ts
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Menu: undefined; // Adicione a rota Menu
  Cargas: undefined;
  DetalhesCarga: { cargaId: string };
  Documentos: undefined;
  Chat: undefined;
  Perfil: undefined;
};