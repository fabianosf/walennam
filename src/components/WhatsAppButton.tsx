import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "5521966403811"; // Número no formato internacional sem espaços
  const message = "Olá! Gostaria de agendar um horário.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;
