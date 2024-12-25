import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-barber-light">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-barber-primary mb-4">
            Experience BarberBook in Action
          </h1>
          <p className="text-xl text-gray-700">
            Try out our booking system with this demo barbershop
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-barber-primary mb-4">
              Book as a Client
            </h2>
            <p className="text-gray-600 mb-6">
              Experience the smooth booking process from a client's perspective
            </p>
            <Button
              onClick={() => navigate("/booking/demo")}
              className="w-full bg-barber-primary hover:bg-barber-primary/90"
            >
              Try Booking Demo
            </Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-barber-primary mb-4">
              View Shop Dashboard
            </h2>
            <p className="text-gray-600 mb-6">
              See how easy it is to manage your barbershop with our dashboard
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-barber-primary hover:bg-barber-primary/90"
            >
              View Dashboard Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;