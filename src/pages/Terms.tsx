const Terms = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-8">Termos de Uso</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao agendar e utilizar os serviços do Beleza Refinada, você concorda com estes Termos de Uso. 
              Se você não concordar com algum destes termos, por favor, não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">2. Agendamentos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Os agendamentos devem ser realizados com antecedência mínima de 24 horas</li>
              <li>Confirmação do agendamento será enviada por e-mail ou WhatsApp</li>
              <li>Chegue com 10 minutos de antecedência para seu horário marcado</li>
              <li>Atrasos superiores a 15 minutos podem resultar em remarcação</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">3. Cancelamentos e Reagendamentos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancelamentos devem ser feitos com no mínimo 24 horas de antecedência</li>
              <li>Cancelamentos de última hora podem estar sujeitos a taxas</li>
              <li>Ausências sem aviso prévio (no-show) podem impossibilitar futuros agendamentos</li>
              <li>Reagendamentos estão sujeitos à disponibilidade</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">4. Pagamento</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>O pagamento deve ser realizado no dia do procedimento</li>
              <li>Aceitamos dinheiro, cartões de crédito e débito, e PIX</li>
              <li>Os preços podem ser alterados sem aviso prévio</li>
              <li>Promoções e descontos estão sujeitos a termos específicos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">5. Responsabilidades do Cliente</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informar sobre alergias, condições de saúde e medicamentos em uso</li>
              <li>Seguir todas as instruções de cuidados pós-procedimento</li>
              <li>Comparecer nas datas de retorno e manutenção recomendadas</li>
              <li>Avisar imediatamente sobre qualquer reação adversa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">6. Garantias e Limitações</h2>
            <p>
              Os resultados dos procedimentos podem variar de acordo com características individuais. 
              Não nos responsabilizamos por resultados insatisfatórios decorrentes de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Não seguimento das instruções de cuidados</li>
              <li>Informações incorretas ou omitidas pelo cliente</li>
              <li>Reações alérgicas não informadas previamente</li>
              <li>Procedimentos realizados por terceiros após nosso serviço</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">7. Propriedade Intelectual</h2>
            <p>
              Todas as imagens, textos e conteúdos deste site são propriedade do Beleza Refinada e protegidos 
              por direitos autorais. Reprodução não autorizada é proibida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">8. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. As alterações entrarão 
              em vigor imediatamente após sua publicação neste site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">9. Contato</h2>
            <p>
              Para dúvidas sobre estes Termos de Uso, entre em contato:
            </p>
            <ul className="list-none pl-0 space-y-2">
              <li>E-mail: contato@belezarefinada.com</li>
              <li>Telefone: (21) 96640-3811</li>
              <li>Endereço: Av. Maracanã - Tijuca, Rio de Janeiro - RJ</li>
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

export default Terms;
