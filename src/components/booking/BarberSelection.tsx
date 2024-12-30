import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";
import { Barbeiro } from "@/components/dashboard/types/barber";

interface BarberSelectionProps {
  selectedBarbeiro: string;
  setSelectedBarbeiro: (value: string) => void;
  barbeiros: Barbeiro[];
}

export const BarberSelection = ({ selectedBarbeiro, setSelectedBarbeiro, barbeiros }: BarberSelectionProps) => {
  if (!barbeiros || barbeiros.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Selecione o Barbeiro
          </CardTitle>
          <CardDescription>Nenhum barbeiro disponível no momento</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
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
  );
};