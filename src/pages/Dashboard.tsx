import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { 
  BarChart, 
  Users, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Settings, 
  Bell, 
  Clock,
  Scissors
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-barber-light to-white">
      <nav className="bg-gradient-to-r from-barber-primary to-barber-primary/90 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scissors className="w-6 h-6" />
            <h1 className="text-xl font-bold">Painel BarberPro</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-barber-secondary">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-barber-secondary">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-barber-primary">
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total de Agendamentos"
            value="156"
            icon={<CalendarIcon className="w-8 h-8" />}
            trend="+12% este mês"
            trendUp={true}
          />
          <StatsCard
            title="Total de Clientes"
            value="89"
            icon={<Users className="w-8 h-8" />}
            trend="+5% este mês"
            trendUp={true}
          />
          <StatsCard
            title="Faturamento"
            value="R$ 3.240"
            icon={<DollarSign className="w-8 h-8" />}
            trend="+8% este mês"
            trendUp={true}
          />
          <StatsCard
            title="Avaliação Média"
            value="4.8"
            icon={<BarChart className="w-8 h-8" />}
            trend="+0.2 este mês"
            trendUp={true}
          />
        </div>

        <Tabs defaultValue="agenda" className="space-y-4">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
          </TabsList>

          <TabsContent value="agenda" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="clientes">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-barber-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">Cliente {i}</p>
                          <p className="text-sm text-gray-500">cliente{i}@email.com</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">4 visitas</p>
                        <p className="text-sm text-gray-500">Último: 15/04/2024</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  trend: string;
  trendUp: boolean;
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-barber-accent/20 rounded-lg">
          {icon}
        </div>
        <span className={`text-sm ${trendUp ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
          {trend}
        </span>
      </div>
      <h3 className="font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

export default Dashboard;