import { useState } from "react";
import emailjs from "@emailjs/browser";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { db } from "@/lib/firebase";
import { sanitizeContactForm, validateContactForm } from "@/lib/security";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_lnfvci6";
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_vwet70d";
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedData = sanitizeContactForm(formData);
    const validation = validateContactForm(sanitizedData);
    if (!validation.valid) {
      toast({
        title: "Verifique os dados",
        description: validation.error ?? "Os dados enviados não são válidos.",
        variant: "destructive",
      });
      return;
    }

    if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
      toast({
        title: "Integração não configurada",
        description: "Configure as credenciais do EmailJS antes de enviar mensagens.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const templateParams = {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        message: sanitizedData.message,
      };

      await emailjs.send(emailServiceId, emailTemplateId, templateParams, {
        publicKey: emailPublicKey,
      });

      try {
        await addDoc(collection(db, "contacts"), {
          ...sanitizedData,
          createdAt: serverTimestamp(),
        });
      } catch (firestoreError) {
        console.warn("Não foi possível salvar no Firestore:", firestoreError);
      }

      toast({
        title: "Mensagem enviada!",
        description: "Retornaremos seu contato em breve.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Contato e Agendamento</h1>
          <p className="text-xl text-muted-foreground">
            Entre em contato conosco e agende sua transformação. Estamos prontas para atendê-la!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-secondary rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold mb-6">Envie uma Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome Completo *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-mail *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefone / WhatsApp
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(21) 96640-3811"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-nos sobre o serviço que você deseja ou tire suas dúvidas..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-background border border-border rounded-2xl p-8">
              <h2 className="text-3xl font-serif font-bold mb-6">Informações de Contato</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Endereço</p>
                    <p className="text-muted-foreground">
                      Av. Maracanã
                      <br />
                      Tijuca
                      <br />
                      Rio de Janeiro, RJ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Telefone / WhatsApp</p>
                    <a
                      href="tel:+5521966403811"
                      className="text-muted-foreground hover:text-yellow-500 transition-colors"
                    >
                      (21) 96640-3811
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">E-mail</p>
                    <a
                      href="mailto:contato@belezarefinada.com"
                      className="text-muted-foreground hover:text-yellow-500 transition-colors"
                    >
                      walennam@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Horário de Atendimento</p>
                    <p className="text-muted-foreground">Segunda a Sexta: 9h às 19h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="text-2xl font-serif font-bold mb-4">Siga-nos nas Redes Sociais</h3>
              <p className="text-muted-foreground mb-6">
                Acompanhe nosso trabalho e fique por dentro das novidades!
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/walenamello/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-background px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="font-medium">Instagram</span>
                </a>
                <a
                  href="https://facebook.com/walena987"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-background px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-all"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="font-medium">Facebook</span>
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="gradient-rose-gold rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-serif font-bold mb-3">Prefere pelo WhatsApp?</h3>
              <p className="mb-6 opacity-95">
                Agende diretamente pelo WhatsApp e receba atendimento rápido!
              </p>
              <Button variant="elegant" size="lg" className="w-full" asChild>
                <a href="https://wa.me/5521966403811?text=Olá!%20Gostaria%20de%20agendar%20um%20horário.">
                  Chamar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-6 text-center">Localização</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.7963663833383!2d-43.23019022402977!3d-22.919546679252693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997eaac3414ecb%3A0x692d129c4906ff22!2sAv.%20Maracanã%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1730990060000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Beleza Refinada"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
