import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-barber-accent to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-barber-primary mb-6">
            Elevate Your Barbershop Business
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Create your personalized booking page, manage appointments, and grow your business with our all-in-one platform.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/login")}
              className="bg-barber-primary hover:bg-barber-primary/90 text-white px-8 py-6 text-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/demo")}
              variant="outline"
              className="border-barber-primary text-barber-primary hover:bg-barber-primary/10 px-8 py-6 text-lg"
            >
              View Demo
            </Button>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Easy Scheduling"
            description="Let clients book appointments 24/7 through your personalized booking page"
            icon="📅"
          />
          <FeatureCard
            title="Business Analytics"
            description="Track your growth with detailed insights and appointment statistics"
            icon="📊"
          />
          <FeatureCard
            title="Client Management"
            description="Build lasting relationships with integrated client profiles and history"
            icon="👥"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-barber-primary mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;