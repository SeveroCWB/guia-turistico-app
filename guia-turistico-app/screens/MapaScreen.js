import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa dos Pontos</Text>
      <Text>O mapa será implementado aqui em breve!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e6ffe6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default MapaScreen;
