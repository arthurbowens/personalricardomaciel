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

  protected readonly transformations = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    src: `/resultado${i + 1}.jpeg`,
    alt: `Resultado ${i + 1} de transformação com Ricardo Maciel`,
  }));

  protected readonly onlineRegions = [
    'Brasília',
    'Goiás',
    'São Paulo',
    'Rio de Janeiro',
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
