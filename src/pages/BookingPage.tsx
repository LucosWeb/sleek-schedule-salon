import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { Clock, Scissors, Calendar as CalendarIcon } from "lucide-react";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const services = [
  { id: 1, name: "Corte de Cabelo", duration: "30 min", price: "R$ 30" },
  { id: 2, name: "Barba", duration: "15 min", price: "R$ 20" },
  { id: 3, name: "Cabelo + Barba", duration: "45 min", price: "R$ 45" },
  { id: 4, name: "Penteado", duration: "20 min", price: "R$ 25" },
];

const BookingPage = () => {
  const { shopId } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-barber-light to-white">
      <div className="bg-gradient-to-r from-barber-primary to-barber-primary/90 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <Scissors className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Barbearia Classic Cuts</h1>
          <p className="text-xl opacity-90">Agende seu próximo horário conosco</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
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
              />
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`${
                      selectedTime === time 
                        ? "bg-barber-primary text-white" 
                        : "hover:bg-barber-primary/10"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="w-5 h-5" />
                Selecione o Serviço
              </CardTitle>
              <CardDescription>Escolha o serviço que deseja agendar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      <div className="flex justify-between items-center w-full">
                        <span>{service.name}</span>
                        <span className="text-gray-500 text-sm">
                          {service.duration} - {service.price}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="w-full bg-gradient-to-r from-barber-primary to-barber-primary/90 hover:from-barber-primary/90 hover:to-barber-primary text-white"
                disabled={!date || !selectedTime || !selectedService}
              >
                Agendar Horário
              </Button>

              <div className="text-sm text-gray-500 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p>Cancelamento gratuito até 24h antes</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p>Confirmação enviada por email</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <p>Notificações de lembrete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;