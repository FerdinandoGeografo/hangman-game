import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { GlobalStore } from './shared/data/global-store';

const buildTitle = (title: string) => `Hangman Game | ${title}`;

export const routes: Routes = [
  {
    path: 'main-menu',
    loadComponent: () =>
      import('./main-menu/main-menu.component').then(
        (c) => c.MainMenuComponent
      ),
    title: buildTitle('Menu'),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./categories/categories.component').then(
        (c) => c.CategoriesComponent
      ),
    title: buildTitle('Categories'),
  },
  {
    path: 'rules',
    loadComponent: () =>
      import('./rules/rules.component').then((c) => c.RulesComponent),
    title: buildTitle('How to Play'),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./game/game.component').then((c) => c.GameComponent),
    title: buildTitle('Ingame'),
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
