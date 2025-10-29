import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PontoTuristicoCard from '../components/PontoTuristicoCard';
import api from '../services/api';

const ListaPontosTuristicos = () => {
  const navigation = useNavigation();
  const [pontosTuristicos, setPontosTuristicos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPontosTuristicos = async () => {
      try {
        const response = await api.get('/posts');
        
        const dadosAdaptados = response.data.map(item => ({
          id: String(item.id),
          nome: item.title,
          descricao: item.body,
          imagem: \https://picsum.photos/id/\/150/150\,
          detalhesCompletos: item.body + ' ' + item.title,
          latitude: -25.4284 + (Math.random() - 0.5) * 0.1,
          longitude: -49.2733 + (Math.random() - 0.5) * 0.1,
        }));

        setPontosTuristicos(dadosAdaptados);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Não foi possível carregar os pontos turísticos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPontosTuristicos();
  }, []);

  const handlePontoPress = (ponto) => {
    navigation.navigate('DetalhesPonto', { pontoDetalhes: ponto });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text style={styles.loadingText}>Carregando pontos turísticos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Pontos Turísticos</Text>
      <FlatList
        data={pontosTuristicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PontoTuristicoCard
            ponto={item}
            onPress={() => handlePontoPress(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffe0e0' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginHorizontal: 20 }
});

export default ListaPontosTuristicos;
