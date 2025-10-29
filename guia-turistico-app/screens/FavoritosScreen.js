import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

const FavoritosScreen = () => {
  const { favoriteIds, isLoadingFavorites } = useFavorites();

  if (isLoadingFavorites) {
    return (
      <View style={styles.container}>
        <Text>Carregando favoritos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>
      {favoriteIds.length === 0 ? (
        <Text>Nenhum ponto turístico favoritado ainda.</Text>
      ) : (
        <Text>IDs Favoritos: {favoriteIds.join(', ')}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f8ff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default FavoritosScreen;
