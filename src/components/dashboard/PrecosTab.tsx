import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface Servico {
  id: string;
  nome: string;
  preco: string;
  duracao: string;
  descricao: string;
}

export const PrecosTab = () => {
  const { toast } = useToast();
  const [servicos, setServicos] = useState<Servico[]>(() => {
    const savedServicos = localStorage.getItem('servicos');
    return savedServicos ? JSON.parse(savedServicos) : [];
  });
  
  const [novoServico, setNovoServico] = useState({
    nome: '',
    preco: '',
    duracao: '',
    descricao: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoServico(prev => ({
      ...prev,
      [name]: value
    }));
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

    const novoServicoCompleto = {
      ...novoServico,
      id: Date.now().toString()
    };

    const novosServicos = [...servicos, novoServicoCompleto];
    setServicos(novosServicos);
    localStorage.setItem('servicos', JSON.stringify(novosServicos));

    setNovoServico({
      nome: '',
      preco: '',
      duracao: '',
      descricao: ''
    });

    toast({
      title: "Serviço adicionado com sucesso!",
      description: "O serviço foi adicionado à tabela de preços.",
    });
  };

  const removerServico = (id: string) => {
    const novosServicos = servicos.filter(servico => servico.id !== id);
    setServicos(novosServicos);
    localStorage.setItem('servicos', JSON.stringify(novosServicos));

    toast({
      title: "Serviço removido com sucesso!",
      description: "O serviço foi removido da tabela de preços.",
    });
  };

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
                  <TableCell>{servico.nome}</TableCell>
                  <TableCell>R$ {servico.preco}</TableCell>
                  <TableCell>{servico.duracao} min</TableCell>
                  <TableCell>{servico.descricao}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removerServico(servico.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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