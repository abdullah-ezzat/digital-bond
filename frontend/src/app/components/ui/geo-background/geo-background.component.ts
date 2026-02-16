import {
  Component,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Shape {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'circle' | 'rounded' | 'triangle' | 'diamond';
  opacity: number;
}

@Component({
  selector: 'app-geo-background',
  standalone: true,
  templateUrl: './geo-background.component.html'
})
export class GeoBackgroundComponent implements AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  shapes = signal<Shape[]>([]);
  private isBrowser = false;
  private rafId: number | null = null;
  private running = true;

  ngAfterViewInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.generateShapes();
    this.animate();
  }

  ngOnDestroy() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private generateShapes() {
    const count = window.innerWidth < 768 ? 5 : 10;
    const shapes: Shape[] = [];

    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let placed = false;

      while (!placed && attempts < 50) {
        const size = this.random(80, 180);
        const x = this.random(size, window.innerWidth - size);
        const y = this.random(size, window.innerHeight - size);

        if (!this.collides(x, y, size, shapes)) {

          shapes.push({
            id: i,
            x,
            y,
            vx: this.random(-0.15, 0.15),
            vy: this.random(-0.15, 0.15),
            size,
            rotation: this.random(0, 360),
            rotationSpeed: this.random(-0.05, 0.05),
            type: this.randomType(),
            opacity: this.random(0.05, 0.15)
          });

          placed = true;
        }

        attempts++;
      }
    }

    this.shapes.set(shapes);
  }

  private collides(x: number, y: number, size: number, shapes: Shape[]) {
    for (const s of shapes) {
      const dx = s.x - x;
      const dy = s.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < (s.size + size) * 0.6) {
        return true;
      }
    }

    return false;
  }

  private animate = () => {
    if (!this.running) return;

    const shapes = this.shapes();

    for (const s of shapes) {
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.rotationSpeed;

      if (s.x <= 0 || s.x >= window.innerWidth - s.size)
        s.vx *= -1;

      if (s.y <= 0 || s.y >= window.innerHeight - s.size)
        s.vy *= -1;
    }

    this.resolveCollisions(shapes);

    this.shapes.set([...shapes]);

    this.rafId = requestAnimationFrame(this.animate);
  };

  private resolveCollisions(shapes: Shape[]) {
    for (let i = 0; i < shapes.length; i++) {
      for (let j = i + 1; j < shapes.length; j++) {

        const a = shapes[i];
        const b = shapes[j];

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = (a.size + b.size) * 0.5;

        if (dist < minDist) {
          const angle = Math.atan2(dy, dx);

          const targetX = a.x + Math.cos(angle) * minDist;
          const targetY = a.y + Math.sin(angle) * minDist;

          const ax = (targetX - b.x) * 0.05;
          const ay = (targetY - b.y) * 0.05;

          a.vx -= ax;
          a.vy -= ay;
          b.vx += ax;
          b.vy += ay;
        }
      }
    }
  }

  private random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private randomType(): Shape['type'] {
    const types: Shape['type'][] = [
      'circle',
      'rounded',
      'triangle',
      'diamond'
    ];
    return types[Math.floor(Math.random() * types.length)];
  }
}
