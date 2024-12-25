import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Users } from "lucide-react";

interface AgendaTabProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export const AgendaTab = ({ date, setDate }: AgendaTabProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Próximos Agendamentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Agendamentos Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-medium">João Silva</p>
                <p className="text-sm text-gray-500">Corte + Barba</p>
              </div>
              <div className="text-right">
                <p className="font-medium">14:00</p>
                <p className="text-sm text-gray-500">Hoje</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);