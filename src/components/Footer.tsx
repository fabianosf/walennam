import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-serif font-bold text-gradient">Beleza Refinada</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transformando sua beleza natural com profissionalismo e dedicação.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Sobre", path: "/sobre" },
                { name: "Serviços", path: "/servicos" },
                { name: "Portfólio", path: "/portfolio" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+5521966403811" className="hover:text-yellow-500 transition-colors">
                  (21) 96640-3811
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:walennam@gmail.com" className="hover:text-yellow-500 transition-colors">
                walennam@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span>Av. Maracanã - Tijuca, Rio de Janeiro - RJ</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Siga-nos</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/walenamello/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/walena987"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Horário de Atendimento:<br />
              Seg-Sex: 9h às 19h
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Fabiano Sousa de Freitas. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-sm text-muted-foreground hover:text-yellow-500 transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
