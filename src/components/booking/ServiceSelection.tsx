import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scissors } from "lucide-react";

interface ServiceSelectionProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  services: any[];
}

export const ServiceSelection = ({ selectedService, setSelectedService, services }: ServiceSelectionProps) => {
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
};