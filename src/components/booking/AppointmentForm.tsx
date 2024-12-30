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
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [services, setServices] = useState<any[]>([]);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const loadData = () => {
      try {
        const savedBarbeiros = localStorage.getItem('barbeiros');
        const savedServices = localStorage.getItem('servicos');
        
        if (savedBarbeiros) {
          const parsedBarbeiros = JSON.parse(savedBarbeiros);
          console.log('Loaded barbers:', parsedBarbeiros);
          setBarbeiros(parsedBarbeiros);
        }
        
        if (savedServices) {
          const parsedServices = JSON.parse(savedServices);
          console.log('Loaded services:', parsedServices);
          setServices(parsedServices);
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (currentUser) {
          setClientName(currentUser.name);
          setClientEmail(currentUser.email);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error("Erro ao carregar dados. Por favor, recarregue a página.");
      }
    };

    loadData();
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
    const valid = !!(
      date && 
      selectedTime && 
      selectedService && 
      selectedBarbeiro && 
      clientName && 
      clientEmail
    );
    console.log('Form validation:', {
      date,
      selectedTime,
      selectedService,
      selectedBarbeiro,
      clientName,
      clientEmail,
      isValid: valid
    });
    return valid;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    try {
      createAppointment(
        clientName,
        selectedService,
        selectedBarbeiro,
        date!,
        selectedTime,
        clientEmail
      );

      toast.success("Agendamento realizado com sucesso!");
      
      setSelectedTime("");
      setSelectedService("");
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error("Erro ao criar agendamento. Por favor, tente novamente.");
    }
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