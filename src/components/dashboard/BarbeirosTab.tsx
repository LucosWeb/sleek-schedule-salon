import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Users, Plus, Trash2 } from "lucide-react";
import { TimeRange, Barbeiro } from "./types/barber";
import { BarbeiroHorarios } from "./BarbeiroHorarios";

export const BarbeirosTab = () => {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>(() => {
    const saved = localStorage.getItem('barbeiros');
    return saved ? JSON.parse(saved) : [];
  });
  const [novoNome, setNovoNome] = useState("");
  
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

  const adicionarHorario = (barbeiroId: string, novoHorario: TimeRange) => {
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
                <Label>Horários por Dia da Semana</Label>
                <BarbeiroHorarios
                  barbeiroId={barbeiro.id}
                  horarios={barbeiro.horarios}
                  onAddHorario={adicionarHorario}
                  onRemoveHorario={removerHorario}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};