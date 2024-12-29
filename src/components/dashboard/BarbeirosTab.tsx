import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Users, Plus, Trash2 } from "lucide-react";

interface Barbeiro {
  id: string;
  nome: string;
  diasDisponiveis: string[];
  horarios: string[];
}

export const BarbeirosTab = () => {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>(() => {
    const saved = localStorage.getItem('barbeiros');
    return saved ? JSON.parse(saved) : [];
  });
  const [novoNome, setNovoNome] = useState("");
  
  const diasSemana = [
    "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
  ];

  const horariosDisponiveis = [
    "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const adicionarBarbeiro = () => {
    if (!novoNome.trim()) {
      toast.error("Por favor, insira o nome do barbeiro");
      return;
    }

    const novoBarbeiro: Barbeiro = {
      id: Date.now().toString(),
      nome: novoNome,
      diasDisponiveis: [],
      horarios: []
    };

    const novosBarbeiros = [...barbeiros, novoBarbeiro];
    setBarbeiros(novosBarbeiros);
    localStorage.setItem('barbeiros', JSON.stringify(novosBarbeiros));
    setNovoNome("");
    toast.success("Barbeiro adicionado com sucesso!");
  };

  const removerBarbeiro = (id: string) => {
    const novosBarbeiros = barbeiros.filter(b => b.id !== id);
    setBarbeiros(novosBarbeiros);
    localStorage.setItem('barbeiros', JSON.stringify(novosBarbeiros));
    toast.success("Barbeiro removido com sucesso!");
  };

  const toggleDia = (barbeiroId: string, dia: string) => {
    setBarbeiros(prevBarbeiros => {
      const novosBarbeiros = prevBarbeiros.map(barbeiro => {
        if (barbeiro.id === barbeiroId) {
          const diasAtualizados = barbeiro.diasDisponiveis.includes(dia)
            ? barbeiro.diasDisponiveis.filter(d => d !== dia)
            : [...barbeiro.diasDisponiveis, dia];
          return { ...barbeiro, diasDisponiveis: diasAtualizados };
        }
        return barbeiro;
      });
      localStorage.setItem('barbeiros', JSON.stringify(novosBarbeiros));
      return novosBarbeiros;
    });
  };

  const toggleHorario = (barbeiroId: string, horario: string) => {
    setBarbeiros(prevBarbeiros => {
      const novosBarbeiros = prevBarbeiros.map(barbeiro => {
        if (barbeiro.id === barbeiroId) {
          const horariosAtualizados = barbeiro.horarios.includes(horario)
            ? barbeiro.horarios.filter(h => h !== horario)
            : [...barbeiro.horarios, horario];
          return { ...barbeiro, horarios: horariosAtualizados };
        }
        return barbeiro;
      });
      localStorage.setItem('barbeiros', JSON.stringify(novosBarbeiros));
      return novosBarbeiros;
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Adicionar Novo Barbeiro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Nome do barbeiro"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
            />
            <Button onClick={adicionarBarbeiro}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      {barbeiros.map((barbeiro) => (
        <Card key={barbeiro.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{barbeiro.nome}</CardTitle>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removerBarbeiro(barbeiro.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Dias Disponíveis</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {diasSemana.map((dia) => (
                    <div key={dia} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${barbeiro.id}-${dia}`}
                        checked={barbeiro.diasDisponiveis.includes(dia)}
                        onCheckedChange={() => toggleDia(barbeiro.id, dia)}
                      />
                      <label
                        htmlFor={`${barbeiro.id}-${dia}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {dia}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Horários Disponíveis</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  {horariosDisponiveis.map((horario) => (
                    <div key={horario} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${barbeiro.id}-${horario}`}
                        checked={barbeiro.horarios.includes(horario)}
                        onCheckedChange={() => toggleHorario(barbeiro.id, horario)}
                      />
                      <label
                        htmlFor={`${barbeiro.id}-${horario}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {horario}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};