import axios from 'axios';
import { API_URL } from '../config';
import { mockCargas } from './mockCargas'; 
import { Carga } from '../types/cargas';

export interface FetchCargasParams {
  status?: 'disponivel' | 'em_andamento' | 'concluida' | 'todos';
  searchTerm?: string;
}

export const fetchCargas = async (params: FetchCargasParams = {}): Promise<Carga[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredCargas = mockCargas;

      if (params.status && params.status !== 'todos') {
        filteredCargas = filteredCargas.filter(carga => carga.status === params.status);
      }

      if (params.searchTerm) {
        const searchTermLower = params.searchTerm.toLowerCase();
        filteredCargas = filteredCargas.filter(carga =>
          carga.id.toLowerCase().includes(searchTermLower) ||
          carga.destino.toLowerCase().includes(searchTermLower)
        );
      }

      resolve(filteredCargas);
    }, 500); 
  });
};

export const uploadDocument = async (imageUri: string) => {
  try {
    const formData = new FormData();
    formData.append('document', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'document.jpg',
    });

    const response = await axios.post(`${API_URL}/documentos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao enviar documento:', error);
    throw error;
  }
};