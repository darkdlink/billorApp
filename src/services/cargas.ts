// src/services/cargas.ts
import axios from 'axios';
import { API_URL } from '../config';

export const fetchCargas = async () => {
  try {
    const response = await axios.get(`${API_URL}/cargas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cargas:', error);
    throw error;
  }
};

export const fetchCargaDetails = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/cargas/${id}`);
    return response.data;  // Ajuste dependendo do formato da API
  } catch (error) {
    console.error('Erro ao buscar detalhes da carga:', error);
    throw error;
  }
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

export const updateCargaStatus = async (id: string, status: string): Promise<void> => {
  try {
    await axios.put(`${API_URL}/cargas/${id}/status`, { status }); // Envie o novo status
  } catch (error) {
    console.error('Erro ao atualizar status da carga:', error);
    throw error;
  }
};