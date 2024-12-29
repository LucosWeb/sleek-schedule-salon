export interface TimeRange {
  inicio: string;
  fim: string;
  tipo: 'trabalho' | 'almoco';
}

export interface Barbeiro {
  id: string;
  nome: string;
  diasDisponiveis: string[];
  horarios: TimeRange[];
}