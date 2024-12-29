import { Appointment } from "@/types/appointment";

interface TimeRange {
  inicio: string;
  fim: string;
}

export const getAvailableTimeSlots = (
  selectedDate: Date,
  barberId: string,
  horariosTrabalho: TimeRange[]
): string[] => {
  // Recupera todos os agendamentos do localStorage
  const savedAppointments = localStorage.getItem('appointments');
  const appointments: Appointment[] = savedAppointments 
    ? JSON.parse(savedAppointments).map((app: any) => ({
        ...app,
        date: new Date(app.date)
      }))
    : [];

  // Filtra os horários ocupados para o barbeiro e data selecionados
  const occupiedTimeSlots = appointments
    .filter(app => 
      app.barberId === barberId && 
      app.status !== 'Cancelado' &&
      new Date(app.date).toDateString() === selectedDate.toDateString()
    )
    .map(app => new Date(app.date).getHours() + ':00');

  // Gera todos os horários disponíveis dentro dos intervalos de trabalho
  const availableTimeSlots: string[] = [];
  horariosTrabalho.forEach(range => {
    const [startHour] = range.inicio.split(':').map(Number);
    const [endHour] = range.fim.split(':').map(Number);
    
    for (let hour = startHour; hour < endHour; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
      if (!occupiedTimeSlots.includes(timeSlot)) {
        availableTimeSlots.push(timeSlot);
      }
    }
  });

  return availableTimeSlots.sort();
};

export const createAppointment = (
  clientName: string,
  service: string,
  barberId: string,
  date: Date,
  time: string
): void => {
  const [hours] = time.split(':');
  const appointmentDate = new Date(date);
  appointmentDate.setHours(parseInt(hours), 0, 0, 0);

  const newAppointment: Appointment = {
    id: Date.now().toString(),
    clientName,
    service,
    barberId,
    date: appointmentDate,
    status: 'Pendente'
  };

  const savedAppointments = localStorage.getItem('appointments');
  const appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  appointments.push(newAppointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
};