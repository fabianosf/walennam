import { Award, Heart, Star, Target } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Paixão",
      description: "Amor genuíno pela arte de realçar a beleza natural de cada cliente",
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Excelência",
      description: "Compromisso com a qualidade e resultados impecáveis em cada procedimento",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Personalização",
      description: "Atendimento individualizado respeitando as características únicas de cada cliente",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Profissionalismo",
      description: "Formação contínua e uso dos melhores produtos e técnicas do mercado",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Minha História</h1>
          <p className="text-xl text-muted-foreground">
            Transformando vidas através da beleza e autoestima
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-secondary rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-serif font-bold mb-6">Sobre Mim</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Olá! Sou a fundadora do Beleza Refinada, e minha jornada no mundo da estética começou há alguns meses, 
                movida pela paixão em realçar a beleza natural de cada mulher.
              </p>
              <p>
                Especializei-me em extensão de cílios, design de sobrancelhas e progressiva capilar, sempre buscando 
                as melhores técnicas e produtos do mercado. Acredito que cada cliente é única e merece um atendimento 
                personalizado que valorize suas características individuais.
              </p>
              <p>
                Ao longo dos anos, tive o privilégio de transformar a autoestima de centenas de clientes, e essa é 
                minha maior recompensa. Cada sorriso de satisfação me motiva a continuar aprimorando minhas habilidades 
                e oferecendo um serviço de excelência.
              </p>
              <p>
                No Beleza Refinada, você encontrará um ambiente acolhedor, higiênico e profissional, onde sua beleza 
                e bem-estar são minha prioridade. Venha conhecer meu trabalho e deixe-me ajudá-la a se sentir ainda 
                mais confiante e radiante!
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Meus Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6 bg-background rounded-xl border border-border hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="max-w-4xl mx-auto bg-muted rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold mb-6 text-center">Formação e Certificações</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-3">
              <Award className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Curso Lash Designer</span>
            </li>
            <li className="flex items-center gap-3">
              <Award className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Curso em Design de Sobrancelhas</span>
            </li>
            <li className="flex items-center gap-3">
              <Award className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Progressiva e Tratamentos Capilares</span>
            </li>
            <li className="flex items-center gap-3">
              <Award className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Depilação Facial na linha</span>
            </li>
            <li className="flex items-center gap-3">
              <Award className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Esfoliação e Argiloterapia</span>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
