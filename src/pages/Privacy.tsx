const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">1. Introdução</h2>
            <p>
              O Beleza Refinada está comprometido em proteger a privacidade de nossos clientes. Esta Política de Privacidade 
              descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">2. Informações Coletadas</h2>
            <p>Coletamos as seguintes informações quando você utiliza nossos serviços:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone/WhatsApp</li>
              <li>Informações sobre os serviços solicitados</li>
              <li>Histórico de agendamentos e procedimentos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">3. Uso das Informações</h2>
            <p>Utilizamos suas informações pessoais para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processar e confirmar seus agendamentos</li>
              <li>Entrar em contato para confirmações e lembretes</li>
              <li>Melhorar nossos serviços e atendimento</li>
              <li>Enviar comunicações sobre promoções e novidades (com seu consentimento)</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">4. Proteção de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações 
              pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">5. Compartilhamento de Informações</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário 
              para fornecer nossos serviços ou quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">6. Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações incorretas</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Retirar seu consentimento para comunicações de marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">7. Contato</h2>
            <p>
              Para questões sobre esta Política de Privacidade ou para exercer seus direitos, entre em contato conosco através de:
            </p>
            <ul className="list-none pl-0 space-y-2">
              <li>E-mail: contato@belezarefinada.com</li>
              <li>Telefone: (21) 96640-3811</li>
            </ul>
          </section>

          <section>
            <p className="text-sm text-muted-foreground italic">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
