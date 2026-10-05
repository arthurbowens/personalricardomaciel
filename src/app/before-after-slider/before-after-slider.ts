import {
  afterNextRender,
  Component,
  ElementRef,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-before-after-slider',
  imports: [],
  templateUrl: './before-after-slider.html',
  styleUrl: './before-after-slider.css',
})
export class BeforeAfterSlider implements OnDestroy {
  readonly beforeSrc = input.required<string>();
  readonly afterSrc = input.required<string>();
  readonly alt = input<string>('Antes e depois · arraste para comparar');

  protected readonly position = signal(50);

  private readonly frame = viewChild<ElementRef<HTMLElement>>('frame');
  private resizeObserver?: ResizeObserver;

  constructor() {
    afterNextRender(() => {
      const el = this.frame()?.nativeElement;
      if (!el) return;
      this.syncFrameSize();
      this.resizeObserver = new ResizeObserver(() => this.syncFrameSize());
      this.resizeObserver.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  protected syncFrameSize(): void {
    const el = this.frame()?.nativeElement;
    if (!el) return;
    el.style.setProperty('--ba-w', `${el.clientWidth}px`);
  }

  protected onRangeInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value)) {
      this.position.set(value);
    }
  }
}
