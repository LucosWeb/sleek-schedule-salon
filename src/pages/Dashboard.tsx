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
  Scissors,
  Link,
  Image,
  Palette,
  Copy
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const [customization, setCustomization] = useState({
    logo: "",
    banner: "",
    primaryColor: "#9b87f5",
    buttonColor: "#F97316"
  });

  const bookingPageUrl = `${window.location.origin}/booking/${123}`; // 123 é um exemplo de ID da barbearia

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingPageUrl);
    toast({
      title: "Link copiado!",
      description: "O link da sua página de agendamento foi copiado para a área de transferência.",
    });
  };

  const handleCustomizationChange = (field: string, value: string) => {
    setCustomization(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
          <TabsList className="grid w-full max-w-[600px] grid-cols-3">
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="personalizacao">Personalização</TabsTrigger>
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

          <TabsContent value="personalizacao">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Personalização da Página de Agendamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="logo">Logo da Barbearia</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="logo"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCustomizationChange('logo', e.target.value)}
                          className="cursor-pointer"
                        />
                        <Image className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="banner">Banner da Página</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="banner"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCustomizationChange('banner', e.target.value)}
                          className="cursor-pointer"
                        />
                        <Image className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="primaryColor">Cor Principal</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={customization.primaryColor}
                          onChange={(e) => handleCustomizationChange('primaryColor', e.target.value)}
                          className="w-full h-10 cursor-pointer"
                        />
                        <Palette className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="buttonColor">Cor dos Botões</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="buttonColor"
                          type="color"
                          value={customization.buttonColor}
                          onChange={(e) => handleCustomizationChange('buttonColor', e.target.value)}
                          className="w-full h-10 cursor-pointer"
                        />
                        <Palette className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Link className="w-5 h-5" />
                          Link da Página de Agendamento
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Input
                            value={bookingPageUrl}
                            readOnly
                            className="bg-white"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleCopyLink}
                            className="shrink-0"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Compartilhe este link com seus clientes para que eles possam fazer agendamentos online.
                        </p>
                      </CardContent>
                    </Card>

                    <Button 
                      className="w-full bg-gradient-to-r from-barber-primary to-barber-primary/90 hover:from-barber-primary/90 hover:to-barber-primary text-white"
                    >
                      Salvar Alterações
                    </Button>
                  </div>
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
