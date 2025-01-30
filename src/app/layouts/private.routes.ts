import { Routes } from '@angular/router';

export const privateRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard-page.component').then(
        (m) => m.DashboardPageComponent
      ),
    data: { reuse: true }, // Reuse the dashboard component to avoid destroy and recreate
  },
  {
    path: 'leaderboard',
    loadComponent: () =>
      import('./leaderboard-page.component').then(
        (m) => m.LeaderboardPageComponent
      ),
  },
  {
    path: 'sell-energy',
    loadComponent: () =>
      import('./trade-sell-page.component').then(
        (m) => m.TradeSellPageComponent
      ),
  },
  {
    path: 'buy-energy',
    loadComponent: () =>
      import('./trade-buy-page.component').then((m) => m.TradeBuyPageComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
