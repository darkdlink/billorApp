// src/types/Carga.ts
export interface Carga {
    id: string;
    origem: string;
    destino: string;
    data: string;
    peso: number;
    tipo: string;
    status: 'disponivel' | 'em_andamento' | 'concluida';
  }