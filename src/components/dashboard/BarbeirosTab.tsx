import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Users, Plus, Trash2, Clock } from "lucide-react";
import { TimeRange } from "./types/barber";

interface Barbeiro {
  id: string;
  nome: string;
  diasDisponiveis: string[];
  horarios: TimeRange[];
}

interface TimeRange {
  inicio: string;
  fim: string;
  tipo: 'trabalho' | 'almoco';
}

export const BarbeirosTab = () => {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>(() => {
    const saved = localStorage.getItem('barbeiros');
    return saved ? JSON.parse(saved) : [];
  });
  const [novoNome, setNovoNome] = useState("");
  const [novoHorario, setNovoHorario] = useState<TimeRange>({
    inicio: "",
    fim: "",
    tipo: "trabalho"
  });
  
  const diasSemana = [
    "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
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

  const adicionarHorario = (barbeiroId: string) => {
    if (!novoHorario.inicio || !novoHorario.fim) {
      toast.error("Por favor, preencha os horários de início e fim");
      return;
    }

    setBarbeiros(prevBarbeiros => {
      const novosBarbeiros = prevBarbeiros.map(barbeiro => {
        if (barbeiro.id === barbeiroId) {
          return {
            ...barbeiro,
            horarios: [...barbeiro.horarios, novoHorario]
          };
        }
        return barbeiro;
      });
      localStorage.setItem('barbeiros', JSON.stringify(novosBarbeiros));
      return novosBarbeiros;
    });

    setNovoHorario({
      inicio: "",
      fim: "",
      tipo: "trabalho"
    });
    
    toast.success("Horário adicionado com sucesso!");
  };

  const removerHorario = (barbeiroId: string, index: number) => {
    setBarbeiros(prevBarbeiros => {
      const novosBarbeiros = prevBarbeiros.map(barbeiro => {
        if (barbeiro.id === barbeiroId) {
          const novosHorarios = [...barbeiro.horarios];
          novosHorarios.splice(index, 1);
          return { ...barbeiro, horarios: novosHorarios };
        }
        return barbeiro;
      });
      localStorage.setItem('barbeiros', JSON.stringify(novosBarbeiros));
      return novosBarbeiros;
    });
    
    toast.success("Horário removido com sucesso!");
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
            <div className="space-y-6">
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
                <Label>Horários</Label>
                <div className="space-y-4 mt-2">
                  {barbeiro.horarios.map((horario, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {horario.inicio} - {horario.fim}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-gray-200">
                        {horario.tipo === 'almoco' ? 'Almoço' : 'Trabalho'}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        onClick={() => removerHorario(barbeiro.id, index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <Input
                      type="time"
                      value={novoHorario.inicio}
                      onChange={(e) => setNovoHorario(prev => ({
                        ...prev,
                        inicio: e.target.value
                      }))}
                      placeholder="Início"
                    />
                    <Input
                      type="time"
                      value={novoHorario.fim}
                      onChange={(e) => setNovoHorario(prev => ({
                        ...prev,
                        fim: e.target.value
                      }))}
                      placeholder="Fim"
                    />
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={novoHorario.tipo}
                      onChange={(e) => setNovoHorario(prev => ({
                        ...prev,
                        tipo: e.target.value as 'trabalho' | 'almoco'
                      }))}
                    >
                      <option value="trabalho">Trabalho</option>
                      <option value="almoco">Almoço</option>
                    </select>
                    <Button onClick={() => adicionarHorario(barbeiro.id)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Horário
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};