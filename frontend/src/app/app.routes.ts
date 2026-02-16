import { Routes } from '@angular/router';
import { TranslationResolver } from './core/resolvers/translation';
import { ReviewsResolver } from './core/resolvers/reviews';
import { ServicesResolver } from './core/resolvers/services';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full',
  },

  {
    path: 'en',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    data: { lang: 'en' },
    resolve: {
      translations: TranslationResolver,
      services: ServicesResolver,
      reviews: ReviewsResolver,
    },
  },
  {
    path: 'ar',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    data: { lang: 'ar' },
    resolve: {
      translations: TranslationResolver,
      services: ServicesResolver,
      reviews: ReviewsResolver,
    },
  },

  { path: '**', redirectTo: 'en' },
];
