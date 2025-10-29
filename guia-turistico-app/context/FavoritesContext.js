// context/PontosTuristicosContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const PontosTuristicosContext = createContext();

export const PontosTuristicosProvider = ({ children }) => {
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
          imagem: `https://picsum.photos/id/${item.id % 100}/150/150`,
          latitude: -25.4284 + (Math.random() - 0.5) * 0.1,
          longitude: -49.2733 + (Math.random() - 0.5) * 0.1,
          detalhesCompletos: item.body + ' ' + item.title,
        }));

        setPontosTuristicos(dadosAdaptados);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os pontos turísticos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPontosTuristicos();
  }, []);

  const contextValue = {
    pontosTuristicos,
    isLoading,
    error,
  };

  return (
    <PontosTuristicosContext.Provider value={contextValue}>
      {children}
    </PontosTuristicosContext.Provider>
  );
};

export const usePontosTuristicos = () => useContext(PontosTuristicosContext);