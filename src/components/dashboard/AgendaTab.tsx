import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Users, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AgendaTabProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

// Dados mockados para exemplo
const mockAppointments = [
  {
    id: 1,
    clientName: "João Silva",
    service: "Corte + Barba",
    date: new Date(2024, 2, 15, 14, 0),
    status: "Confirmado",
  },
  {
    id: 2,
    clientName: "Maria Oliveira",
    service: "Corte Feminino",
    date: new Date(2024, 2, 15, 15, 30),
    status: "Pendente",
  },
  {
    id: 3,
    clientName: "Pedro Santos",
    service: "Barba",
    date: new Date(2024, 2, 16, 10, 0),
    status: "Confirmado",
  },
];

export const AgendaTab = ({ date, setDate }: AgendaTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !date || format(appointment.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              locale={ptBR}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                  placeholder="Buscar por cliente ou serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.clientName}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>
                    {format(appointment.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    {format(appointment.date, "HH:mm")}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      appointment.status === "Confirmado" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {appointment.status}
                    </span>
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