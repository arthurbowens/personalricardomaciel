import { Component, HostListener, signal } from '@angular/core';
import { BeforeAfterSlider } from './before-after-slider/before-after-slider';

@Component({
  selector: 'app-root',
  imports: [BeforeAfterSlider],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  private readonly whatsappNumber = '556192293029';
  private readonly whatsappMessage =
    'Olá Ricardo! Vim pelo site e quero saber mais sobre os planos de treino.';

  protected readonly whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
  protected readonly instagramUrl = 'https://www.instagram.com/personal_ricardomaciel';

  protected whatsappPlanUrl(planName: string): string {
    const message = `Olá Ricardo! Vim pelo site e tenho interesse no plano ${planName}.`;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  protected readonly specialties = [
    {
      title: 'Celulite e Lipedema',
      text: 'Protocolos inteligentes para melhorar a aparência da celulite mesmo com lipedema, com progressão segura e constante.',
      icon: 'cellulite',
    },
    {
      title: 'Emagrecimento',
      text: 'Emagreça com saúde: plano personalizado, intensidade certa e suporte físico e emocional para sustentar o resultado.',
      icon: 'weight',
    },
    {
      title: 'Pernas e Glúteos',
      text: 'Construção estética com técnica corrigida, progressão estratégica e aproveitamento máximo de cada treino.',
      icon: 'glutes',
    },
  ] as const;

  protected readonly results = [
    {
      title: 'Emagrecer com saúde',
      items: [
        'Perda de gordura visceral e localizada',
        'Plano personalizado conforme necessidade e capacidade',
        'Intensidade ajustada ao seu objetivo',
        'Apoio físico e emocional para manter o planejamento',
      ],
    },
    {
      title: 'Definição + músculos',
      items: [
        'Correção de técnica',
        'Progressão estratégica com menos risco de lesões',
        'Aproveitamento máximo do tempo',
        'Acompanhamento da evolução e resultados consistentes',
      ],
    },
    {
      title: 'Resistência corporal',
      items: [
        'Melhora da resistência cardiorrespiratória',
        'Aumento da resistência muscular localizada',
        'Mais energia no dia a dia',
        'Resistência mental e mais foco',
      ],
    },
  ] as const;

  /** Pares resultado{N}antes + resultado{N}dps em /public. Ordem: 16 primeiro, sem o 1. */
  private static readonly transformationOrder = [
    16, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ] as const;

  protected readonly transformations = App.transformationOrder.map((n) => ({
    id: n,
    antes: `/resultado${n}antes.jpeg`,
    depois: `/resultado${n}dps.jpeg`,
    alt: `Comparativo antes e depois · transformação de aluna`,
  }));

  protected readonly onlineRegions = [
    'Brasília',
    'Goiás',
    'São Paulo',
    'Rio de Janeiro',
    'Bahia',
    'Minas Gerais',
    'Irlanda do Norte',
    'Alemanha',
    'Portugal',
    'EUA',
  ] as const;

  protected readonly gyms = [
    'Toda a rede Evolve Sudoeste',
    'Toda a rede Evolve Noroeste',
    'As 2 unidades Evolve de Águas Claras',
    'Evolve Brasil 21',
    'Rede Evolve Asa Sul',
    'Rede Evolve Asa Norte',
    'Rede Evolve Águas Claras',
    'Rede Evolve Vicente Pires',
    'Rede Evolve Taguatinga',
  ] as const;

  protected readonly gamaLocations = [
    {
      name: 'Evolve Gama Central',
      address: 'St. Central, Quadra 09 (próximo ao Comper)',
    },
    {
      name: 'Evolve Ponte Alta',
      address: 'Posto Rodobelo, próximo à Sayonara',
    },
  ] as const;

  protected readonly plans = [
    { name: 'Mensal', detail: 'Flexibilidade para começar agora' },
    { name: 'Bimestral', detail: 'Ritmo e acompanhamento contínuo' },
    { name: 'Trimestral', detail: 'Evolução com mais consistência' },
    { name: 'Semestral', detail: 'Seis meses com foco no objetivo' },
    { name: 'Anual', detail: 'Compromisso total com a transformação' },
  ] as const;

  /** Um carrossel por pessoa. Prints da mesma aluna ficam juntos. */
  protected readonly depoimentoCarousels = [
    {
      id: 'suellen',
      eyebrow: 'Suellen · fotos e medidas',
      title: 'Evolução da Suellen',
      lead: 'Foto com o Ricardo e os comparativos de medidas e bioimpedância dela.',
      slides: [
        {
          src: '/suellen.jpeg',
          alt: 'Suellen com o personal Ricardo Maciel na academia',
          caption: 'Suellen · aluna',
        },
        {
          src: '/feedbacktamanhos.jpeg',
          alt: 'Tabela de medidas da Suellen: baseline 27/03 e evolução em 28/07',
          caption: 'Medidas · 27/03 a 28/07',
        },
        {
          src: '/feedbacktamanhos1.jpeg',
          alt: 'Comparativo de bioimpedância da Suellen de maio a agosto',
          caption: 'Bioimpedância · maio a agosto',
        },
      ],
    },
    {
      id: 'antes-resultado',
      eyebrow: 'Mesma aluna · 90 dias',
      title: '90 dias de transformação',
      lead: 'Do pedido pra guardar as fotos “no fundo do baú” até o feedback no WhatsApp e as fotos do resultado em 90 dias.',
      slides: [
        {
          src: '/depoimento17.jpeg',
          alt: 'Print do início: aluna pede para guardar as fotos e quer estar magra no aniversário em julho',
          caption: 'Início · meta do aniversário',
        },
        {
          src: '/feedback1.jpeg',
          alt: 'Print de WhatsApp: aluna agradece o incentivo e compartilha o feedback da transformação',
          caption: 'Mensagem no WhatsApp',
        },
        {
          src: '/resultadofeedback1.jpeg',
          alt: 'Antes e depois da aluna que enviou o feedback no WhatsApp',
          caption: 'Antes e depois',
        },
      ],
    },
    {
      id: 'online-6kg',
      eyebrow: 'Mesma aluna · online',
      title: '6 kg em 1 mês',
      lead: 'Conversa contínua: saiu de 94 kg para 88 kg, confia de olhos fechados e diz que já fez personal online antes, mas sem esse suporte e esses resultados.',
      slides: [
        {
          src: '/depoimento.jpeg',
          alt: 'Depoimento: aluna saiu de 94 kg para 88 kg em 1 mês e está feliz com os resultados',
          caption: '94 kg a 88 kg · 6 kg em 1 mês',
        },
        {
          src: '/depoimento1.jpeg',
          alt: 'Depoimento: aluna diz que o suporte e os resultados online superaram outros personais',
          caption: 'Suporte e resultados de verdade',
        },
        {
          src: '/depoimento3.jpeg',
          alt: 'Depoimento: continuidade da conversa sobre evolução e metas',
          caption: 'Evolução e metas',
        },
        {
          src: '/depoimento4.jpeg',
          alt: 'Depoimento: aluna fala em treinar presencial e receber estratégias de corrida',
          caption: 'Presencial e corrida',
        },
        {
          src: '/depoimento5.jpeg',
          alt: 'Depoimento: início do segundo mês com parabéns pelos resultados',
          caption: 'Segundo mês de resultados',
        },
        {
          src: '/depoimento6.jpeg',
          alt: 'Depoimento: aluna curte os treinos e o jeito direto do acompanhamento',
          caption: 'Treinos e acompanhamento',
        },
      ],
    },
    {
      id: 'sem-tomar-nada',
      eyebrow: 'Outra aluna',
      title: 'Resultados sem tomar nada',
      lead: 'Print separado: ela conta que não toma nada e que os resultados estão vindo.',
      slides: [
        {
          src: '/depoimento2.jpeg',
          alt: 'Depoimento: aluna agradece e diz que os resultados estão vindo sem tomar nada',
          caption: 'Resultados sem tomar nada',
        },
      ],
    },
    {
      id: 'juh',
      eyebrow: 'Juh · mesma conversa',
      title: 'Processo mental e resultado',
      lead: 'O treino fez muita diferença, o processo foi gigantesco (principalmente mental) e hoje ela se sente outra pessoa.',
      slides: [
        {
          src: '/depoimento8.jpeg',
          alt: 'Depoimento da Juh: treino faz muita diferença e ela vai mandar antes e depois',
          caption: 'Treino faz diferença',
        },
        {
          src: '/depoimento9.jpeg',
          alt: 'Depoimento da Juh: processo gigantesco mentalmente e se sente outra pessoa',
          caption: 'Processo mental e resultado',
        },
      ],
    },
    {
      id: 'jessica',
      eyebrow: 'Jessica · 69 dias',
      title: 'Antes e depois da Jessica',
      lead: 'Resultado em 69 dias, com os prints dela: perdeu gordura, manteve músculo e saiu do GG para o M.',
      slides: [
        {
          src: '/depoimentojessica.jpeg',
          alt: 'Depoimento da Jessica: perdeu gordura, manteve músculo e saiu do GG para o M',
          caption: 'GG para M',
        },
        {
          src: '/depoimentojessica1.jpeg',
          alt: 'Depoimento da Jessica: passou a gostar do que vê no espelho e a vestir o que gosta',
          caption: 'Confiança no processo',
        },
      ],
    },
  ] as const;

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
