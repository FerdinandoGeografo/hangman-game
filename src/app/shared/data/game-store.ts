import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Categories, Category } from '../models/category.model';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { concatMap, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Option } from '../models/option.model';

import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { MenuItem } from '../models/menu-item.model';

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export type KeyGame = (typeof ALPHABET)[number];

type GameState = {
  categories: Categories;
  selectedCategory: Category | null;
  selectedOption: Option['name'] | null;
  attemptsLeft: number;
  attempted: string[];
  menuItems: MenuItem[];
};

const initialState: GameState = {
  categories: {},
  selectedCategory: null,
  selectedOption: null,
  attemptsLeft: 8,
  attempted: [],
  menuItems: [],
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withDevtools('game'),
  withState(initialState),
  withComputed((store) => ({
    categoryNames: computed(() => Object.keys(store.categories())),
    gameStatus: computed(() =>
      store.attemptsLeft() === 0
        ? 'You Lose'
        : store
            .selectedOption()
            ?.replace(' ', '')
            .split('')
            .every((letter) => store.attempted().includes(letter.toUpperCase()))
        ? 'You Win'
        : 'Paused'
    ),
    menuOpen: computed(() => store.menuItems().length > 0),
  })),
  withMethods((store) => ({
    loadCategories: rxMethod<void>(
      pipe(
        concatMap(() =>
          inject(HttpClient)
            .get<{ categories: Categories }>('data/data.json')
            .pipe(tap(({ categories }) => patchState(store, { categories })))
        )
      )
    ),
    startGame(category: Category) {
      const selectableOptions = store
        .categories()
        [category].filter((opt) => !opt.selected);
      const randomIndex = Math.floor(Math.random() * selectableOptions.length);
      const randomOption = selectableOptions[randomIndex];

      const categoriesUpdated = { ...store.categories() };
      categoriesUpdated[category] = categoriesUpdated[category].map((opt) =>
        opt.name === randomOption.name ? { ...opt, selected: true } : opt
      );

      patchState(store, {
        selectedCategory: category,
        selectedOption: randomOption.name,
        categories: categoriesUpdated,
        attempted: randomOption.name
          .replace(' ', '')
          .split('')
          .reduce((acc, curr) => {
            if (acc.length === 3) return acc;

            const randomIndex = Math.floor(
              Math.random() *
                randomOption.name.replace(' ', '').split('').length
            );

            const randomLetter = randomOption.name.replace(' ', '').split('')[
              randomIndex
            ];

            if (!curr.includes(randomLetter))
              return [...acc, randomLetter.toUpperCase()];

            return acc;
          }, [] as string[]),
      });
    },
    quitGame() {
      patchState(store, ({ categories }) => ({
        ...initialState,
        categories,
      }));
    },
    attemptLetter(letter: string) {
      if (store.attempted().includes(letter)) return;

      patchState(store, (state) => ({
        attempted: [...state.attempted, letter],
        attemptsLeft: state.selectedOption?.toUpperCase().includes(letter)
          ? state.attemptsLeft
          : state.attemptsLeft - 1,
      }));
    },
    openMenu() {
      patchState(store, {
        menuItems: [
          store.gameStatus() === 'Paused'
            ? {
                label: 'Continue',
                onClick: () => this.closeMenu(),
              }
            : {
                label: 'Play Again!',
                onClick: () => this.startGame(store.selectedCategory()!),
              },
          {
            label: 'New Category',
            routerLink: '/categories',
            onClick: () => this.quitGame(),
          },
          {
            label: 'Quit Game',
            routerLink: 'main-menu',
            buttonStyleClass: 'btn--secondary',
          },
        ],
      });
    },
    closeMenu() {
      patchState(store, { menuItems: [] });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadCategories();
    },
  })
);
