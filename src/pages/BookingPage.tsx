import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useLocation } from "react-router-dom";
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

const BookingPage = () => {
  const { shopId } = useParams();
  const location = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [customization, setCustomization] = useState({
    logo: "",
    banner: "",
    primaryColor: "#9b87f5",
    buttonColor: "#F97316",
    title: "Minha Barbearia"
  });
  const [elementOrder, setElementOrder] = useState([
    { id: "title", label: "Título" },
    { id: "logo", label: "Logo" },
    { id: "banner", label: "Banner" },
    { id: "services", label: "Serviços" },
    { id: "calendar", label: "Calendário" }
  ]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    // Load customizations whenever the URL changes (including query params)
    const savedCustomization = localStorage.getItem(`bookingPageCustomization_${shopId}`);
    if (savedCustomization) {
      const { customization: savedCustomizationData, elementOrder: savedElementOrder } = JSON.parse(savedCustomization);
      setCustomization(savedCustomizationData);
      setElementOrder(savedElementOrder);
    }

    const savedServices = localStorage.getItem('servicos');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, [shopId, location.search]); // Add location.search to dependencies

  const renderElement = (elementId: string) => {
    switch (elementId) {
      case 'title':
        return (
          <h1 className="text-4xl font-bold mb-4 text-center">{customization.title}</h1>
        );
      case 'logo':
        return customization.logo && (
          <div className="flex justify-center mb-4">
            <img src={customization.logo} alt="Logo" className="max-h-24" />
          </div>
        );
      case 'banner':
        return customization.banner && (
          <div className="w-full mb-6">
            <img src={customization.banner} alt="Banner" className="w-full h-48 object-cover rounded-lg" />
          </div>
        );
      case 'services':
        return (
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
        );
      case 'calendar':
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-barber-light to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {elementOrder.map((element) => (
            <div key={element.id}>
              {renderElement(element.id)}
            </div>
          ))}

          <Button
            className="w-full bg-gradient-to-r from-barber-primary to-barber-primary/90 hover:from-barber-primary/90 hover:to-barber-primary text-white"
            disabled={!date || !selectedTime || !selectedService}
            style={{ backgroundColor: customization.buttonColor }}
          >
            Confirmar Agendamento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
