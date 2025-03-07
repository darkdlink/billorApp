import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import CargasScreen from '../screens/CargasScreen';
import DetalhesCargaScreen from '../screens/DetalhesCargaScreen';
import DocumentosScreen from '../screens/DocumentosScreen';
import ChatScreen from '../screens/ChatScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { RootStackParamList } from '../types/navigation'; // Importe o tipo

type DetalhesCargaScreenProps = StackScreenProps<RootStackParamList, 'DetalhesCarga'>;

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Cargas" component={CargasScreen} />
        <Stack.Screen name="DetalhesCarga" component={(props: DetalhesCargaScreenProps) => <DetalhesCargaScreen {...props} />}  />
        <Stack.Screen name="Documentos" component={DocumentosScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;