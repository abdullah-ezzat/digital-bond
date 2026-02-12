import {
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[magnetic]',
  standalone: true,
})
export class MagneticDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    this.el.nativeElement.style.transform =
      `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.el.nativeElement.style.transform = 'translate(0,0)';
  }
}
