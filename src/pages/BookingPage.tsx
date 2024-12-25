import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "react-router-dom";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const services = [
  { id: 1, name: "Haircut", duration: "30 min", price: "$30" },
  { id: 2, name: "Beard Trim", duration: "15 min", price: "$20" },
  { id: 3, name: "Haircut + Beard", duration: "45 min", price: "$45" },
  { id: 4, name: "Hair Styling", duration: "20 min", price: "$25" },
];

const BookingPage = () => {
  const { shopId } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

  return (
    <div className="min-h-screen bg-barber-light">
      <div className="bg-barber-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Classic Cuts Barbershop</h1>
          <p className="text-xl opacity-90">Book your next appointment with us</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>Choose your preferred appointment slot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={selectedTime === time ? "bg-barber-primary" : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Service</CardTitle>
              <CardDescription>Choose the service you'd like to book</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      <div className="flex justify-between items-center">
                        <span>{service.name}</span>
                        <span className="text-gray-500 text-sm">
                          {service.duration} - {service.price}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="w-full bg-barber-primary hover:bg-barber-primary/90"
                disabled={!date || !selectedTime || !selectedService}
              >
                Book Appointment
              </Button>

              <div className="text-sm text-gray-500">
                <p>✓ Free cancellation up to 24h before</p>
                <p>✓ Confirmation sent to your email</p>
                <p>✓ Reminder notifications</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;