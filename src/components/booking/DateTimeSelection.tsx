import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Barbeiro } from "@/components/dashboard/types/barber";

interface DateTimeSelectionProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedBarbeiro: string;
  barbeiros: Barbeiro[];
  availableTimeSlots: string[];
  diasSemana: string[];
}

export const DateTimeSelection = ({
  date,
  setDate,
  selectedTime,
  setSelectedTime,
  selectedBarbeiro,
  barbeiros,
  availableTimeSlots,
  diasSemana,
}: DateTimeSelectionProps) => {
  return (
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
          {availableTimeSlots.map((horario) => (
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
  );
};