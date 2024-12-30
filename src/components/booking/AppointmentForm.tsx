import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getAvailableTimeSlots, createAppointment } from "@/utils/appointments";
import { Barbeiro } from "@/components/dashboard/types/barber";
import { UserDataSection } from "./UserDataSection";
import { ServiceSelection } from "./ServiceSelection";
import { BarberSelection } from "./BarberSelection";
import { DateTimeSelection } from "./DateTimeSelection";

interface AppointmentFormProps {
  customization: {
    buttonColor: string;
  };
}

const diasSemana = [
  "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
];

export const AppointmentForm = ({ customization }: AppointmentFormProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [barbeiros] = useState<Barbeiro[]>(() => {
    const saved = localStorage.getItem('barbeiros');
    return saved ? JSON.parse(saved) : [];
  });
  const [services] = useState<any[]>(() => {
    const saved = localStorage.getItem('servicos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
      setClientName(currentUser.name);
      setClientEmail(currentUser.email);
    }
  }, []);

  const getBarbeiroHorariosDisponiveis = () => {
    if (!selectedBarbeiro || !date) return [];
    
    const barbeiro = barbeiros.find(b => b.id === selectedBarbeiro);
    if (!barbeiro) return [];

    const diaSemana = diasSemana[date.getDay()];
    if (!barbeiro.diasDisponiveis.includes(diaSemana)) return [];

    const horariosTrabalho = barbeiro.horarios
      .filter(h => h.tipo === 'trabalho' && h.diaSemana === diaSemana)
      .map(h => ({inicio: h.inicio, fim: h.fim}));

    return getAvailableTimeSlots(date, selectedBarbeiro, horariosTrabalho);
  };

  const isFormValid = () => {
    return (
      date && 
      selectedTime && 
      selectedService && 
      selectedBarbeiro && 
      clientName && 
      clientEmail
    );
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    createAppointment(
      clientName,
      selectedService,
      selectedBarbeiro,
      date,
      selectedTime,
      clientEmail
    );

    toast.success("Agendamento realizado com sucesso!");
    
    setSelectedTime("");
    setSelectedService("");
  };

  const availableTimeSlots = getBarbeiroHorariosDisponiveis();

  return (
    <div className="space-y-6">
      <UserDataSection 
        clientName={clientName}
        clientEmail={clientEmail}
      />

      <ServiceSelection 
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        services={services}
      />

      <BarberSelection 
        selectedBarbeiro={selectedBarbeiro}
        setSelectedBarbeiro={setSelectedBarbeiro}
        barbeiros={barbeiros}
      />

      <DateTimeSelection 
        date={date}
        setDate={setDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedBarbeiro={selectedBarbeiro}
        barbeiros={barbeiros}
        availableTimeSlots={availableTimeSlots}
        diasSemana={diasSemana}
      />

      <Button
        className="w-full bg-gradient-to-r from-barber-primary to-barber-primary/90 hover:from-barber-primary/90 hover:to-barber-primary text-white"
        disabled={!isFormValid()}
        onClick={handleSubmit}
        style={{ backgroundColor: customization.buttonColor }}
      >
        Confirmar Agendamento
      </Button>
    </div>
  );
};