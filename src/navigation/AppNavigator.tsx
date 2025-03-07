import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MenuScreen from '../screens/MenuScreen';
import CargasScreen from '../screens/CargasScreen';
import DetalhesCargaScreen from '../screens/DetalhesCargaScreen';
import DocumentosScreen from '../screens/DocumentosScreen';
import ChatScreen from '../screens/ChatScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!token);
      } catch (e) {
        console.log(e)
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Menu' : 'Login'}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Cargas" component={CargasScreen} />
      <Stack.Screen name="DetalhesCarga" component={DetalhesCargaScreen} />
      <Stack.Screen name="Documentos" component={DocumentosScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}