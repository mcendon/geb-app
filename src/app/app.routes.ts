import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./layouts/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./layouts/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
