import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sobre", path: "/sobre" },
    { name: "Serviços", path: "/servicos" },
    { name: "Produtos", path: "/produtos" },
    { name: "Portfólio", path: "/portfolio" },
    { name: "Depoimentos", path: "/depoimentos" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" />
          <span className="text-2xl font-serif font-bold text-gradient">Beleza Refinada</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-yellow-600 ${
                location.pathname === link.path
                  ? "text-yellow-500"
                  : isScrolled
                    ? "text-foreground/80"
                    : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="hero" size="lg" asChild>
            <Link to="/contato">Agende Agora</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors hover:text-yellow-600 py-2 ${
                  location.pathname === link.path ? "text-yellow-500" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="hero" size="lg" className="mt-2" asChild>
              <Link to="/contato" onClick={() => setIsMobileMenuOpen(false)}>
                Agende Agora
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
