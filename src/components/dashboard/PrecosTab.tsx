import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Servico } from "./types/servico";

export const PrecosTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [novoServico, setNovoServico] = useState({
    nome: '',
    preco: '',
    duracao: '',
    descricao: ''
  });
  const [editandoServico, setEditandoServico] = useState<string | null>(null);

  const { data: servicos = [], isLoading } = useQuery({
    queryKey: ['servicos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        toast({
          title: "Erro ao carregar serviços",
          variant: "destructive"
        });
        throw error;
      }

      return data || [];
    }
  });

  const adicionarServicoMutation = useMutation({
    mutationFn: async (servico: Omit<Servico, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('servicos')
        .insert([{ ...servico, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
      setNovoServico({
        nome: '',
        preco: '',
        duracao: '',
        descricao: ''
      });
      toast({
        title: "Serviço adicionado com sucesso!"
      });
    },
    onError: () => {
      toast({
        title: "Erro ao adicionar serviço",
        variant: "destructive"
      });
    }
  });

  const atualizarServicoMutation = useMutation({
    mutationFn: async (servico: Servico) => {
      const { error } = await supabase
        .from('servicos')
        .update(servico)
        .eq('id', servico.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
      setEditandoServico(null);
      toast({
        title: "Serviço atualizado com sucesso!"
      });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar serviço",
        variant: "destructive"
      });
    }
  });

  const removerServicoMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('servicos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servicos'] });
      toast({
        title: "Serviço removido com sucesso!"
      });
    },
    onError: () => {
      toast({
        title: "Erro ao remover serviço",
        variant: "destructive"
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editandoServico) {
      const servicoAtual = servicos.find(s => s.id === editandoServico);
      if (servicoAtual) {
        atualizarServicoMutation.mutate({
          ...servicoAtual,
          [name]: value
        });
      }
    } else {
      setNovoServico(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const adicionarServico = () => {
    if (!novoServico.nome || !novoServico.preco || !novoServico.duracao) {
      toast({
        title: "Erro ao adicionar serviço",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    adicionarServicoMutation.mutate(novoServico);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Serviço</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Nome do serviço"
              name="nome"
              value={novoServico.nome}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Preço (R$)"
              name="preco"
              value={novoServico.preco}
              onChange={handleInputChange}
              type="number"
            />
            <Input
              placeholder="Duração (min)"
              name="duracao"
              value={novoServico.duracao}
              onChange={handleInputChange}
              type="number"
            />
            <Input
              placeholder="Descrição (opcional)"
              name="descricao"
              value={novoServico.descricao}
              onChange={handleInputChange}
            />
          </div>
          <Button 
            onClick={adicionarServico}
            className="mt-4 w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Serviço
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tabela de Preços</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicos.map((servico) => (
                <TableRow key={servico.id}>
                  <TableCell>
                    {editandoServico === servico.id ? (
                      <Input
                        name="nome"
                        value={servico.nome}
                        onChange={handleInputChange}
                      />
                    ) : (
                      servico.nome
                    )}
                  </TableCell>
                  <TableCell>
                    {editandoServico === servico.id ? (
                      <Input
                        name="preco"
                        value={servico.preco}
                        onChange={handleInputChange}
                        type="number"
                      />
                    ) : (
                      `R$ ${servico.preco}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editandoServico === servico.id ? (
                      <Input
                        name="duracao"
                        value={servico.duracao}
                        onChange={handleInputChange}
                        type="number"
                      />
                    ) : (
                      `${servico.duracao} min`
                    )}
                  </TableCell>
                  <TableCell>
                    {editandoServico === servico.id ? (
                      <Input
                        name="descricao"
                        value={servico.descricao}
                        onChange={handleInputChange}
                      />
                    ) : (
                      servico.descricao
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {editandoServico === servico.id ? (
                        <>
                          <Button
                            variant="default"
                            size="icon"
                            onClick={() => setEditandoServico(null)}
                          >
                            ✓
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditandoServico(null)}
                          >
                            ✕
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditandoServico(servico.id)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removerServicoMutation.mutate(servico.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};