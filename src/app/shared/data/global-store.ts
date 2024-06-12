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
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

type GlobalState = {
  categories: Categories;
  selectedCategory: Category | null;
  selectedOption: Option['name'] | null;
  attemptsLeft: number;
  attemptedLetters: Letter[];
};

const initialState: GlobalState = {
  categories: {},
  selectedCategory: null,
  selectedOption: null,
  attemptsLeft: 8,
  attemptedLetters: [],
};

const getRandomElement: <T>(array: T[]) => T = (array) =>
  array.slice()[Math.floor(Math.random() * array.length)];

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('global'),
  withState(initialState),

  withComputed(({ categories, selectedOption }) => ({
    categoriesNames: computed(() => Object.keys(categories())),
    toGuessLetters: computed(() => selectedOption()?.split('') || []),
  })),
  withComputed(({ attemptsLeft, attemptedLetters, toGuessLetters }) => ({
    prettyGameStatus: computed(() => {
      if (attemptsLeft() === 0) {
        return 'You Lose';
      }

      if (
        toGuessLetters().every((el) =>
          attemptedLetters().includes(el as Letter)
        )
      ) {
        return 'You Win';
      }

      return 'Paused';
    }),
  })),

  withMethods((store) => ({
    loadCategories: rxMethod<void>(
      pipe(
        switchMap(() =>
          inject(HttpClient).get<{ categories: Categories }>('data/data.json')
        ),
        tap(({ categories }) => patchState(store, { categories }))
      )
    ),
    startGame(category: Category) {
      // 1. Select a random word from category selectables options
      patchState(store, ({ categories }) => ({
        selectedCategory: category,
        selectedOption: getRandomElement(
          categories[category].filter((el) => !el.selected)
        ).name.toUpperCase(),
      }));
      // 2. Updates categories for the new selection
      patchState(store, ({ categories, selectedOption }) => ({
        categories: {
          ...categories,
          [category]: categories[category].map((el) =>
            el.name.toUpperCase() === selectedOption
              ? { ...el, selected: true }
              : el
          ),
        },
      }));
      //3. Prepopulate attemptedLetters with two random letters contained in toGuessLetters array
    },
    attemptLetter(letter: Letter) {},
    quitGame() {},
  })),
  withHooks({
    onInit(store) {
      store.loadCategories();
    },
  })
);
