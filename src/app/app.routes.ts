import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { GlobalStore } from './shared/data/global-store';

export const routes: Routes = [
  {
    path: 'main-menu',
    loadComponent: () =>
      import('./main-menu/main-menu.component').then(
        (c) => c.MainMenuComponent
      ),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
  },
  {
    path: 'rules',
    loadComponent: () =>
      import('./rules/rules.component').then((c) => c.RulesComponent),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./game/game.component').then((c) => c.GameComponent),
    canActivate: [
      () =>
        !inject(GlobalStore).selectedCategory()
          ? inject(Router).navigate(['main-menu'])
          : true,
    ],
  },
  {
    path: '**',
    redirectTo: '/main-menu',
  },
];
