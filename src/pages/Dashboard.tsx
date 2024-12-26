import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  BarChart, 
  Users, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Settings, 
  Bell, 
  Scissors,
  PriceTag
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AgendaTab } from "@/components/dashboard/AgendaTab";
import { ClientsTab } from "@/components/dashboard/ClientsTab";
import { CustomizationTab } from "@/components/dashboard/CustomizationTab";
import { PrecosTab } from "@/components/dashboard/PrecosTab";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [customization, setCustomization] = useState({
    logo: "",
    banner: "",
    primaryColor: "#9b87f5",
    buttonColor: "#F97316",
    title: "Minha Barbearia"
  });

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
          <TabsList className="grid w-full max-w-[800px] grid-cols-4">
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="precos">Tabela de Preços</TabsTrigger>
            <TabsTrigger value="personalizacao">Personalização</TabsTrigger>
          </TabsList>

          <TabsContent value="agenda">
            <AgendaTab date={date} setDate={setDate} />
          </TabsContent>

          <TabsContent value="clientes">
            <ClientsTab />
          </TabsContent>

          <TabsContent value="precos">
            <PrecosTab />
          </TabsContent>

          <TabsContent value="personalizacao">
            <CustomizationTab 
              customization={customization}
              setCustomization={setCustomization}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;