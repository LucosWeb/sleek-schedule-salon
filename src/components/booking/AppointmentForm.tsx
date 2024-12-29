import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Clock, Scissors, Calendar as CalendarIcon, User } from "lucide-react";
import { toast } from "sonner";
import { getAvailableTimeSlots, createAppointment } from "@/utils/appointments";
import { Barbeiro } from "@/components/dashboard/types/barber";

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
      .filter(h => h.tipo === 'trabalho')
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
    
    // Limpa o formulário
    setSelectedTime("");
    setSelectedService("");
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Seus Dados
          </CardTitle>
          <CardDescription>Seus dados de cadastro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Seu nome completo"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              disabled
            />
            <Input
              type="email"
              placeholder="Seu email"
              value={clientEmail}
              disabled
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Selecione o Serviço
          </CardTitle>
          <CardDescription>Escolha o serviço que deseja agendar</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um serviço" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  <div className="flex justify-between items-center w-full">
                    <span>{service.nome}</span>
                    <span className="text-gray-500 text-sm">
                      {service.duracao} min - R$ {service.preco}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Selecione o Barbeiro
          </CardTitle>
          <CardDescription>Escolha o profissional de sua preferência</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedBarbeiro} onValueChange={setSelectedBarbeiro}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um barbeiro" />
            </SelectTrigger>
            <SelectContent>
              {barbeiros.map((barbeiro) => (
                <SelectItem key={barbeiro.id} value={barbeiro.id}>
                  {barbeiro.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Selecione Data e Hora
          </CardTitle>
          <CardDescription>Escolha seu horário preferido</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => {
              if (!selectedBarbeiro) return true;
              const barbeiro = barbeiros.find(b => b.id === selectedBarbeiro);
              if (!barbeiro) return true;
              const diaSemana = diasSemana[date.getDay()];
              return !barbeiro.diasDisponiveis.includes(diaSemana);
            }}
          />
          <div className="grid grid-cols-2 gap-2">
            {getBarbeiroHorariosDisponiveis().map((horario) => (
              <Button
                key={horario}
                variant={selectedTime === horario ? "default" : "outline"}
                className={`${
                  selectedTime === horario 
                    ? "bg-barber-primary text-white" 
                    : "hover:bg-barber-primary/10"
                }`}
                onClick={() => setSelectedTime(horario)}
              >
                <Clock className="w-4 h-4 mr-2" />
                {horario}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

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