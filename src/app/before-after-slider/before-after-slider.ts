import {
  afterNextRender,
  Component,
  ElementRef,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';

type DragPhase = 'idle' | 'pending' | 'dragging';

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

  private phase: DragPhase = 'idle';
  private activePointerId: number | null = null;
  private startX = 0;
  private startY = 0;

  private readonly root = viewChild<ElementRef<HTMLElement>>('root');
  private readonly frame = viewChild<ElementRef<HTMLElement>>('frame');
  private resizeObserver?: ResizeObserver;

  private readonly onGlobalPointerEnd = (event: PointerEvent): void => {
    if (this.activePointerId !== null && event.pointerId !== this.activePointerId) return;
    this.endDrag();
  };

  constructor() {
    afterNextRender(() => {
      const el = this.frame()?.nativeElement;
      if (!el) return;
      this.syncFrameSize();
      this.resizeObserver = new ResizeObserver(() => this.syncFrameSize());
      this.resizeObserver.observe(el);

      window.addEventListener('pointerup', this.onGlobalPointerEnd);
      window.addEventListener('pointercancel', this.onGlobalPointerEnd);
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    window.removeEventListener('pointerup', this.onGlobalPointerEnd);
    window.removeEventListener('pointercancel', this.onGlobalPointerEnd);
  }

  protected syncFrameSize(): void {
    const el = this.frame()?.nativeElement;
    if (!el) return;
    el.style.setProperty('--ba-w', `${el.clientWidth}px`);
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    if (this.phase !== 'idle') return;

    this.phase = 'pending';
    this.activePointerId = event.pointerId;
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  protected onPointerMove(event: PointerEvent): void {
    if (this.activePointerId !== event.pointerId) return;

    const el = this.root()?.nativeElement;
    if (!el) return;

    if (this.phase === 'pending') {
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
      if (Math.hypot(dx, dy) < 6) return;

      if (Math.abs(dx) <= Math.abs(dy) * 1.1) {
        this.endDrag();
        return;
      }

      this.phase = 'dragging';
      el.setPointerCapture(event.pointerId);
      el.classList.add('ba--dragging');
      event.preventDefault();
      this.setPositionFromEvent(event, el);
      return;
    }

    if (this.phase !== 'dragging') return;
    event.preventDefault();
    this.setPositionFromEvent(event, el);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.activePointerId !== event.pointerId) return;
    this.endDrag();
  }

  private endDrag(): void {
    const el = this.root()?.nativeElement;
    if (el && this.activePointerId !== null && el.hasPointerCapture(this.activePointerId)) {
      el.releasePointerCapture(this.activePointerId);
    }
    el?.classList.remove('ba--dragging');
    this.phase = 'idle';
    this.activePointerId = null;
  }

  private setPositionFromEvent(event: PointerEvent, el: HTMLElement): void {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = event.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    this.position.set(pct);
  }
}
