import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Clock } from "lucide-react";
import { TimeRange } from "./types/barber";
import { toast } from "sonner";

interface BarbeiroHorariosProps {
  barbeiroId: string;
  horarios: TimeRange[];
  onAddHorario: (barbeiroId: string, horario: TimeRange) => void;
  onRemoveHorario: (barbeiroId: string, index: number) => void;
}

export const BarbeiroHorarios = ({
  barbeiroId,
  horarios,
  onAddHorario,
  onRemoveHorario,
}: BarbeiroHorariosProps) => {
  const [novoHorario, setNovoHorario] = useState<TimeRange>({
    inicio: "",
    fim: "",
    tipo: "trabalho",
    diaSemana: "Segunda"
  });

  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const handleAddHorario = () => {
    if (!novoHorario.inicio || !novoHorario.fim || !novoHorario.diaSemana) {
      toast.error("Por favor, preencha todos os campos do horário");
      return;
    }

    onAddHorario(barbeiroId, novoHorario);
    setNovoHorario({
      inicio: "",
      fim: "",
      tipo: "trabalho",
      diaSemana: "Segunda"
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {horarios.map((horario, index) => (
          <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">{horario.diaSemana}:</span>
            <span className="text-sm">
              {horario.inicio} - {horario.fim}
            </span>
            <span className="text-xs px-2 py-1 rounded bg-gray-200">
              {horario.tipo === "almoco" ? "Almoço" : "Trabalho"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => onRemoveHorario(barbeiroId, index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={novoHorario.diaSemana}
          onChange={(e) =>
            setNovoHorario((prev) => ({
              ...prev,
              diaSemana: e.target.value,
            }))
          }
        >
          {diasSemana.map((dia) => (
            <option key={dia} value={dia}>
              {dia}
            </option>
          ))}
        </select>
        <Input
          type="time"
          value={novoHorario.inicio}
          onChange={(e) =>
            setNovoHorario((prev) => ({
              ...prev,
              inicio: e.target.value,
            }))
          }
          placeholder="Início"
        />
        <Input
          type="time"
          value={novoHorario.fim}
          onChange={(e) =>
            setNovoHorario((prev) => ({
              ...prev,
              fim: e.target.value,
            }))
          }
          placeholder="Fim"
        />
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={novoHorario.tipo}
          onChange={(e) =>
            setNovoHorario((prev) => ({
              ...prev,
              tipo: e.target.value as "trabalho" | "almoco",
            }))
          }
        >
          <option value="trabalho">Trabalho</option>
          <option value="almoco">Almoço</option>
        </select>
        <Button onClick={handleAddHorario} className="md:col-span-4">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Horário
        </Button>
      </div>
    </div>
  );
};