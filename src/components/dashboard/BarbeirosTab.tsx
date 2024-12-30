import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Users, Plus, Trash2 } from "lucide-react";
import { TimeRange, Barbeiro } from "./types/barber";
import { BarbeiroHorarios } from "./BarbeiroHorarios";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const BarbeirosTab = () => {
  const [novoNome, setNovoNome] = useState("");
  const queryClient = useQueryClient();
  
  const diasSemana = [
    "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
  ];

  const { data: barbeiros = [], isLoading } = useQuery({
    queryKey: ['barbeiros'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('barbeiros')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        toast.error('Erro ao carregar barbeiros');
        throw error;
      }

      return data || [];
    }
  });

  const adicionarBarbeiroMutation = useMutation({
    mutationFn: async (novoBarbeiro: Omit<Barbeiro, 'id'>) => {
      const { data, error } = await supabase
        .from('barbeiros')
        .insert([novoBarbeiro])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['barbeiros'] });
      toast.success("Barbeiro adicionado com sucesso!");
      setNovoNome("");
    },
    onError: () => {
      toast.error("Erro ao adicionar barbeiro");
    }
  });

  const removerBarbeiroMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('barbeiros')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['barbeiros'] });
      toast.success("Barbeiro removido com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao remover barbeiro");
    }
  });

  const atualizarBarbeiroMutation = useMutation({
    mutationFn: async (barbeiro: Barbeiro) => {
      const { error } = await supabase
        .from('barbeiros')
        .update(barbeiro)
        .eq('id', barbeiro.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['barbeiros'] });
      toast.success("Barbeiro atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar barbeiro");
    }
  });

  const adicionarBarbeiro = () => {
    if (!novoNome.trim()) {
      toast.error("Por favor, insira o nome do barbeiro");
      return;
    }

    adicionarBarbeiroMutation.mutate({
      nome: novoNome,
      diasDisponiveis: [],
      horarios: []
    });
  };

  const toggleDia = (barbeiroId: string, dia: string) => {
    const barbeiro = barbeiros.find(b => b.id === barbeiroId);
    if (!barbeiro) return;

    const diasAtualizados = barbeiro.diasDisponiveis.includes(dia)
      ? barbeiro.diasDisponiveis.filter(d => d !== dia)
      : [...barbeiro.diasDisponiveis, dia];

    atualizarBarbeiroMutation.mutate({
      ...barbeiro,
      diasDisponiveis: diasAtualizados
    });
  };

  const adicionarHorario = (barbeiroId: string, novoHorario: TimeRange) => {
    const barbeiro = barbeiros.find(b => b.id === barbeiroId);
    if (!barbeiro) return;

    atualizarBarbeiroMutation.mutate({
      ...barbeiro,
      horarios: [...barbeiro.horarios, novoHorario]
    });
  };

  const removerHorario = (barbeiroId: string, index: number) => {
    const barbeiro = barbeiros.find(b => b.id === barbeiroId);
    if (!barbeiro) return;

    const novosHorarios = [...barbeiro.horarios];
    novosHorarios.splice(index, 1);

    atualizarBarbeiroMutation.mutate({
      ...barbeiro,
      horarios: novosHorarios
    });
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

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
                onClick={() => removerBarbeiroMutation.mutate(barbeiro.id)}
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