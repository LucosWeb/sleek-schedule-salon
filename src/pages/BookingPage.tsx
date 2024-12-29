import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AppointmentForm } from "@/components/booking/AppointmentForm";

const BookingPage = () => {
  const { shopId } = useParams();
  const location = useLocation();
  const [customization, setCustomization] = useState({
    logo: "",
    banner: "",
    primaryColor: "#9b87f5",
    buttonColor: "#F97316",
    title: "Minha Barbearia"
  });
  const [elementOrder, setElementOrder] = useState([
    { id: "title", label: "Título" },
    { id: "logo", label: "Logo" },
    { id: "banner", label: "Banner" },
    { id: "services", label: "Serviços" },
    { id: "calendar", label: "Calendário" }
  ]);

  useEffect(() => {
    const savedCustomization = localStorage.getItem(`bookingPageCustomization_${shopId}`);
    if (savedCustomization) {
      const { customization: savedCustomizationData, elementOrder: savedElementOrder } = JSON.parse(savedCustomization);
      setCustomization(savedCustomizationData);
      setElementOrder(savedElementOrder);
    }
  }, [shopId, location.search]);

  const renderElement = (elementId: string) => {
    switch (elementId) {
      case 'title':
        return (
          <h1 className="text-4xl font-bold mb-4 text-center">{customization.title}</h1>
        );
      case 'logo':
        return customization.logo && (
          <div className="flex justify-center mb-4">
            <img src={customization.logo} alt="Logo" className="max-h-24" />
          </div>
        );
      case 'banner':
        return customization.banner && (
          <div className="w-full mb-6">
            <img src={customization.banner} alt="Banner" className="w-full h-48 object-cover rounded-lg" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-barber-light to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {elementOrder.map((element) => (
            <div key={element.id}>
              {renderElement(element.id)}
            </div>
          ))}
          
          <AppointmentForm customization={customization} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;