import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Calendar, Clock, Scissors } from "lucide-react";

export const MyAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);

    if (user) {
      const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const userAppointments = allAppointments.filter((app: any) => 
        app.clientEmail === user.email
      );
      setAppointments(userAppointments);
    }
  }, []);

  const handleCancel = (appointmentId: string) => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = allAppointments.map((app: any) => 
      app.id === appointmentId ? { ...app, status: 'Cancelado' } : app
    );
    
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    setAppointments(appointments.map(app => 
      app.id === appointmentId ? { ...app, status: 'Cancelado' } : app
    ));
    
    toast.success("Agendamento cancelado com sucesso!");
  };

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p>Faça login para ver seus agendamentos</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Meus Agendamentos</h2>
      {appointments.length === 0 ? (
        <p className="text-center py-8 text-gray-500">
          Você ainda não tem agendamentos
        </p>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment.id} className="relative">
            <CardHeader>
              <CardTitle className="text-lg">
                Agendamento - {appointment.status}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(appointment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4" />
                  <span>{appointment.service}</span>
                </div>
                {appointment.status !== 'Cancelado' && (
                  <Button 
                    variant="destructive"
                    onClick={() => handleCancel(appointment.id)}
                    className="mt-4"
                  >
                    Cancelar Agendamento
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};