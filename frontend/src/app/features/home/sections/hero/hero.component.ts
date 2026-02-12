import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ParticlesService } from '@/shared/particles.service';
import { MagneticDirective } from '@/shared/magnetic.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  imports: [MagneticDirective]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particlesCanvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private particles: ParticlesService
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef.nativeElement;
    this.particles.start(canvas, 900);
  }

  ngOnDestroy() {
    this.particles.stop();
  }
}
