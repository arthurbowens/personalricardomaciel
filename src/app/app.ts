import { Component, ElementRef, HostListener, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly resultIndex = signal(0);

  private readonly resultsTrack = viewChild<ElementRef<HTMLElement>>('resultsTrack');

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

  protected readonly transformations = [
    { id: 1, src: '/resultado1.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 2, src: '/resultado2.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 3, src: '/resultado3.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 4, src: '/resultado4.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 5, src: '/resultado5.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 6, src: '/resultado6.jpeg', alt: 'Mesmos 60 kg com redistribuição corporal em 30 dias', detail: '30 dias · mesmos 60 kg' },
    { id: 7, src: '/resultado7.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 20, src: '/resultado20.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 8, src: '/resultado8.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 9, src: '/resultado9.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 11, src: '/resultado11.jpeg', alt: 'Antes e depois: 105 kg para 83 kg', detail: '105 kg a 83 kg' },
    { id: 12, src: '/resultado12.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 13, src: '/resultado13.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 14, src: '/resultado14.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 15, src: '/resultado15.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    {
      id: 16,
      src: '/resultado16.jpeg',
      alt: '10 meses: menos 27,6 kg, mais 1,7 kg de massa magra e menos 22,1% de gordura',
      detail: '10 meses · -27,6 kg · +1,7 kg massa magra · -22,1% gordura',
    },
    { id: 17, src: '/resultado17.jpeg', alt: 'Transformação em 70 dias', detail: '70 dias' },
    { id: 19, src: '/resultado19.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 21, src: '/resultado21.jpeg', alt: 'Antes e depois de aluno', detail: '' },
    { id: 22, src: '/resultado22.jpeg', alt: 'Transformação em 5 meses', detail: '5 meses' },
    { id: 23, src: '/resultado23.jpeg', alt: 'Evolução da Geisielly em 90 dias', detail: '90 dias' },
    { id: 24, src: '/resultado24.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 25, src: '/resultado25.jpeg', alt: 'Antes e depois de aluna', detail: '' },
    { id: 26, src: '/resultado26.jpeg', alt: 'Antes e depois de aluno', detail: '' },
  ];

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
      eyebrow: 'Mesma aluna',
      title: '1 mês e 5 dias de transformação',
      lead: 'Do pedido pra guardar as fotos “no fundo do baú” até o feedback no WhatsApp e as fotos do resultado.',
      slides: [
        {
          src: '/depoimento17.jpeg',
          alt: 'Print do início: aluna pede para guardar as fotos e quer estar magra no aniversário em julho',
          caption: 'Início · meta do aniversário',
        },
        {
          src: '/feedback1.jpeg',
          alt: 'Print de WhatsApp: aluna agradece o incentivo e diz que o resultado foi em 1 mês e 5 dias',
          caption: 'Mensagem no WhatsApp',
        },
        {
          src: '/resultadofeedback1.jpeg',
          alt: 'Antes e depois da aluna que enviou o feedback no WhatsApp',
          caption: 'Antes e depois',
        },
        {
          src: '/resultado2feedback1.jpeg',
          alt: 'Foto de resultado da mesma aluna do feedback no WhatsApp',
          caption: 'Resultado',
        },
        {
          src: '/resultado19.jpeg',
          alt: 'Antes e depois em perfil da mesma aluna',
          caption: 'Antes e depois · perfil',
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

  protected onResultsScroll(event: Event): void {
    const track = event.target as HTMLElement;
    const slide = track.querySelector('.result-slide') as HTMLElement | null;
    if (!slide) return;
    const style = getComputedStyle(track);
    const gap = Number.parseFloat(style.columnGap || style.gap || '0') || 0;
    const slideWidth = slide.getBoundingClientRect().width + gap;
    if (slideWidth <= 0) return;
    const index = Math.round(track.scrollLeft / slideWidth);
    this.resultIndex.set(Math.max(0, Math.min(index, this.transformations.length - 1)));
  }

  protected goToResult(index: number): void {
    const track = this.resultsTrack()?.nativeElement;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    const trackRect = track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const left = track.scrollLeft + (slideRect.left - trackRect.left);
    track.scrollTo({ left, behavior: 'smooth' });
    this.resultIndex.set(index);
  }

  protected nextResult(): void {
    this.goToResult(Math.min(this.resultIndex() + 1, this.transformations.length - 1));
  }

  protected prevResult(): void {
    this.goToResult(Math.max(this.resultIndex() - 1, 0));
  }
}
