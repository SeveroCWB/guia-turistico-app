import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { FavoritesProvider } from './context/FavoritesContext';

import ListaPontosTuristicos from './screens/ListaPontosTuristicos';
import DetalhesPontoTuristico from './screens/DetalhesPontoTuristico';
import FavoritosScreen from './screens/FavoritosScreen';
import MapaScreen from './screens/MapaScreen';

// NO App.js, ADICIONE ESTAS IMPORTACÕES:
import { PontosTuristicosProvider } from './context/PontosTuristicosContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ExplorarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='ListaPontos'
        component={ListaPontosTuristicos}
        options={{ title: 'Explorar Pontos' }}
      />
      <Stack.Screen
        name='DetalhesPonto'
        component={DetalhesPontoTuristico}
        options={{ title: 'Detalhes do Ponto' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Explorar') {
                iconName = focused ? 'compass' : 'compass-outline';
              } else if (route.name === 'Favoritos') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'Mapa') {
                iconName = focused ? 'map' : 'map-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen
            name='Explorar'
            component={ExplorarStack}
            options={{ tabBarLabel: 'Explorar' }}
          />
          <Tab.Screen
            name='Favoritos'
            component={FavoritosScreen}
            options={{ tabBarLabel: 'Favoritos' }}
          />
          <Tab.Screen
            name='Mapa'
            component={MapaScreen}
            options={{ tabBarLabel: 'Mapa' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}


// E MODIFIQUE O RETURN para incluir o novo Provider:
export default function App() {
  return (
    <PontosTuristicosProvider> {/* <-- NOVO PROVIDER */}
      <FavoritesProvider>
        <NavigationContainer>
          {/* ... resto do código igual ... */}
        </NavigationContainer>
      </FavoritesProvider>
    </PontosTuristicosProvider>
  );
}