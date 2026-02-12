import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ParticlesService {
  private animationId: number | null = null;
  private resizeHandler?: () => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  start(canvas: HTMLCanvasElement, delay = 800) {
    if (!isPlatformBrowser(this.platformId)) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const isLowPowerDevice =
      navigator.hardwareConcurrency &&
      navigator.hardwareConcurrency <= 4;

    if (prefersReducedMotion || isLowPowerDevice) {
      return;
    }

    setTimeout(() => {
      this.initParticles(canvas);
    }, delay);
  }

  stop() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  private initParticles(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: any[] = [];
    const count = window.innerWidth < 1024 ? 25 : 45;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    this.resizeHandler = resize;
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.5,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(171,2,2,0.35)';
        ctx.fill();
      }

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }
}
