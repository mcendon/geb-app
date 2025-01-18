import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PrivateComponent } from './layouts/private.component';

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
    path: 'private',
    loadChildren: () =>
      import('./layouts/private.routes').then((m) => m.privateRoutes),
    canActivate: [AuthGuard],
    component: PrivateComponent,
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
