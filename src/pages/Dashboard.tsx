import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { BarChart, Users, Calendar as CalendarIcon, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-barber-light">
      <nav className="bg-barber-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">BarberBook Dashboard</h1>
          <Button variant="ghost" className="text-white hover:text-barber-secondary">
            Logout
          </Button>
        </div>
      </nav>

      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Appointments"
            value="156"
            icon={<CalendarIcon className="w-8 h-8" />}
            trend="+12% from last month"
          />
          <StatsCard
            title="Total Clients"
            value="89"
            icon={<Users className="w-8 h-8" />}
            trend="+5% from last month"
          />
          <StatsCard
            title="Revenue"
            value="$3,240"
            icon={<DollarSign className="w-8 h-8" />}
            trend="+8% from last month"
          />
          <StatsCard
            title="Avg. Rating"
            value="4.8"
            icon={<BarChart className="w-8 h-8" />}
            trend="+0.2 from last month"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
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
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">Haircut + Beard Trim</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">2:00 PM</p>
                      <p className="text-sm text-gray-500">Today</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

const StatsCard = ({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend: string }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-barber-accent/20 rounded-lg">
          {icon}
        </div>
        <span className="text-sm text-green-600">{trend}</span>
      </div>
      <h3 className="font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

export default Dashboard;