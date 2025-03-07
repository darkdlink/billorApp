// src/services/mockCargas.ts

import { Carga } from '../types/cargas'; // Assumindo que você tem uma interface Carga

export const mockCargas: Carga[] = [
  {
    id: '1',
    origem: 'São Paulo',
    destino: 'Rio de Janeiro',
    data: '2025-03-10',
    peso: 1000,
    tipo: 'Eletrônicos',
    status: 'disponivel',
    descricao: "Transporte de materiais eletronicos para as Lojas Americanas"
  },
  {
    id: '2',
    origem: 'Belo Horizonte',
    destino: 'Salvador',
    data: '2025-03-12',
    peso: 1500,
    tipo: 'Alimentos',
    status: 'em_andamento',
    descricao: "Transporte de alimentos não perecíveis para as Lojas Americanas"
  },
  {
    id: '3',
    origem: 'Curitiba',
    destino: 'Porto Alegre',
    data: '2025-03-15',
    peso: 800,
    tipo: 'Vestuário',
    status: 'concluida',
      descricao: "Transporte de roupas para as Lojas Americanas"
  },
  {
    id: '4',
    origem: 'Recife',
    destino: 'Manaus',
    data: '2025-03-18',
    peso: 2000,
    tipo: 'Maquinário',
    status: 'disponivel',
     descricao: "Transporte de máquinas para as Lojas Americanas"
  },
  {
    id: '5',
    origem: 'Goiânia',
    destino: 'Fortaleza',
    data: '2025-03-20',
    peso: 1200,
    tipo: 'Produtos Químicos',
    status: 'em_andamento',
      descricao: "Transporte de produtos químicos para as Lojas Americanas"
  },
  {
    id: '6',
    origem: 'Brasília',
    destino: 'Belém',
    data: '2025-03-22',
    peso: 900,
    tipo: 'Livros',
    status: 'concluida',
    descricao: "Transporte de livros para as Lojas Americanas"
  },
  // Adicione mais cargas mock aqui
];