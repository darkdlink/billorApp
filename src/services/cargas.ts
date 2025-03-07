// src/services/cargas.ts
import axios from 'axios';
import { API_URL } from '../config';

// Função mock para simular a resposta da API
const mockCargas = [
  { id: '1', origem: 'São Paulo', destino: 'Rio de Janeiro', data: '2025-03-08', peso: 1000, tipo: 'Eletrônicos' },
  { id: '2', origem: 'Belo Horizonte', destino: 'Salvador', data: '2025-03-09', peso: 1500, tipo: 'Alimentos' },
];

export const fetchCargas = async () => {
  try {
    // Simulação de chamada à API (com um atraso)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCargas);
      }, 500);
    });
  } catch (error) {
    console.error('Erro ao buscar cargas:', error);
    throw error;
  }
};