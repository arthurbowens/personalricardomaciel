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

  private dragging = false;
  private readonly root = viewChild<ElementRef<HTMLElement>>('root');
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

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    event.stopPropagation();
    const el = this.root()?.nativeElement;
    if (!el) return;
    el.setPointerCapture(event.pointerId);
    this.dragging = true;
    this.setPositionFromEvent(event, el);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging) return;
    event.stopPropagation();
    const el = this.root()?.nativeElement;
    if (!el) return;
    this.setPositionFromEvent(event, el);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragging) return;
    this.dragging = false;
    this.root()?.nativeElement.releasePointerCapture(event.pointerId);
  }

  private setPositionFromEvent(event: PointerEvent, el: HTMLElement): void {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = event.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    this.position.set(pct);
  }
}
