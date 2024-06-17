import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Categories, Category } from '../models/category.model';
import { Letter } from '../models/letter.model';
import { Option } from '../models/option.model';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MenuConfig } from '../models/menu.model';

type GlobalState = {
  categories: Categories;
  selectedCategory: Category | null;
  selectedOption: Option['name'] | null;
  attemptsLeft: number;
  attemptedLetters: Letter[];
  menuConfig: MenuConfig;
};

const initialState: GlobalState = {
  categories: {},
  selectedCategory: null,
  selectedOption: null,
  attemptsLeft: 8,
  attemptedLetters: [],
  menuConfig: { header: '', menuItems: [] },
};

const initialStateA: GlobalState = {
  categories: {},
  selectedCategory: 'Countries',
  selectedOption: 'UNITED KINGDOM',
  attemptsLeft: 8,
  attemptedLetters: ['U', 'N', 'I', 'D', 'O'],
  menuConfig: { header: '', menuItems: [] },
};

const initialStateB: GlobalState = {
  categories: {},
  selectedCategory: 'Movies',
  selectedOption: 'THE LION KING',
  attemptsLeft: 8,
  attemptedLetters: ['L', 'T', 'H', 'K', 'O', 'N'],
  menuConfig: { header: '', menuItems: [] },
};

const initialStateC: GlobalState = {
  categories: {},
  selectedCategory: 'Animals',
  selectedOption: 'GORILLA',
  attemptsLeft: 8,
  attemptedLetters: ['O', 'I', 'L'],
  menuConfig: { header: '', menuItems: [] },
};

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('global'),
  withState(initialState),
  withComputed(({ categories, selectedOption, menuConfig }) => ({
    categoriesNames: computed(() => Object.keys(categories())),
    toGuessLetters: computed<Letter[]>(
      () =>
        [
          ...new Set(selectedOption()?.replaceAll(' ', '').split('')),
        ] as Letter[]
    ),
    menuOpen: computed(() => menuConfig().menuItems.length > 0),
  })),
  withComputed(({ attemptsLeft, toGuessLetters, attemptedLetters }) => ({
    gameOutcome: computed<'WIN' | 'LOSE' | null>(() => {
      if (attemptsLeft() === 0) return 'LOSE';
      if (toGuessLetters().every((el) => attemptedLetters().includes(el)))
        return 'WIN';

      return null;
    }),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    loadCategories: rxMethod<void>(
      pipe(
        switchMap(() => http.get<{ categories: Categories }>('data/data.json')),
        tap(({ categories }) => patchState(store, { categories }))
      )
    ),
    startGame(category: Category) {
      const selectableOptions = store
        .categories()
        [category].filter((opt) => !opt.selected);
      const option =
        selectableOptions[Math.floor(Math.random() * selectableOptions.length)];

      patchState(store, ({ categories }) => ({
        categories: {
          ...categories,
          [category]: categories[category].map((el) =>
            el.name === option.name ? { ...option, selected: true } : el
          ),
        },
        selectedCategory: category,
        selectedOption: option.name.toUpperCase().replaceAll(`'`, ''),
        attemptsLeft: 8,
        attemptedLetters: [],
        menuConfig: { ...initialState.menuConfig },
      }));
    },
    attemptLetter(letter: Letter) {
      if (store.attemptedLetters().includes(letter) || store.menuOpen()) return;

      patchState(
        store,
        ({ attemptedLetters, attemptsLeft, selectedOption }) => ({
          attemptedLetters: [...attemptedLetters, letter],
          attemptsLeft: selectedOption?.includes(letter)
            ? attemptsLeft
            : attemptsLeft - 1,
        })
      );

      if (store.gameOutcome()) {
        this.openMenu();
      }
    },
    quitGame() {
      patchState(store, ({ categories }) => ({ ...initialState, categories }));
    },
    openMenu() {
      patchState(store, () => ({
        menuConfig: {
          header:
            store.gameOutcome() === 'LOSE'
              ? 'You Lose'
              : store.gameOutcome() === 'WIN'
              ? 'You Win'
              : 'Paused',
          menuItems: [
            !store.gameOutcome()
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
              routerLink: '/main-menu',
              onClick: () => {
                this.quitGame();
                this.loadCategories();
              },
              buttonStyleClass: 'btn--secondary',
            },
          ],
        },
      }));
    },
    closeMenu() {
      patchState(store, { menuConfig: { ...initialState.menuConfig } });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadCategories();
    },
  })
);
