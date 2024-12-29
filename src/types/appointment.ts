export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  barberId: string;
  date: Date;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
}