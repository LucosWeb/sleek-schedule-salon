import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "react-router-dom";

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
    <div className="min-h-screen bg-barber-light">
      <div className="bg-barber-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Barbearia Classic Cuts</h1>
          <p className="text-xl opacity-90">Agende seu próximo horário conosco</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Selecione Data e Hora</CardTitle>
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
                    className={selectedTime === time ? "bg-barber-primary" : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selecione o Serviço</CardTitle>
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
                      <div className="flex justify-between items-center">
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
                className="w-full bg-barber-primary hover:bg-barber-primary/90"
                disabled={!date || !selectedTime || !selectedService}
              >
                Agendar Horário
              </Button>

              <div className="text-sm text-gray-500">
                <p>✓ Cancelamento gratuito até 24h antes</p>
                <p>✓ Confirmação enviada por email</p>
                <p>✓ Notificações de lembrete</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;