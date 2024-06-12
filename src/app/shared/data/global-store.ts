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

const generateRandom: <T>(arr: T[], num: number) => T[] = (arr, num) => {
  if (num > arr.length) return [];

  const randomIndexes: Set<number> = new Set();
  while (randomIndexes.size < num) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (!randomIndexes.has(randomIndex)) randomIndexes.add(randomIndex);
  }

  const result = Array.from(randomIndexes).map((index) => arr[index]);
  console.log(result);
  return result;
};

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('global'),
  withState(initialState),
  withComputed(({ categories, selectedOption }) => ({
    categoriesNames: computed(() => Object.keys(categories())),
    toGuessLetters: computed<Letter[]>(
      () => (selectedOption()?.split('') || []) as Letter[]
    ),
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
      const option = {
        ...generateRandom(
          store.categories()[category].filter((opt) => !opt.selected),
          1
        )[0],
        selected: true,
      };

      patchState(store, ({ categories }) => ({
        // 2. Updates categories for the new selection
        categories: {
          ...categories,
          [category]: categories[category].map((el) =>
            el.name === option.name ? option : el
          ),
        },
        selectedCategory: category,
        selectedOption: option.name.toUpperCase().replace(`'`, ''),
      }));

      patchState(store, {
        //3. Prepopulate attemptedLetters with two random letters contained in toGuessLetters array
        attemptedLetters: generateRandom(store.toGuessLetters(), 2),
      });
    },
    attemptLetter(letter: Letter) {
      if (store.attemptedLetters().includes(letter)) return;

      patchState(
        store,
        ({ attemptedLetters, attemptsLeft, selectedOption }) => ({
          attemptedLetters: [...attemptedLetters, letter],
          attemptsLeft: selectedOption?.includes(letter)
            ? attemptsLeft
            : attemptsLeft - 1,
        })
      );
    },
    quitGame() {
      patchState(store, ({ categories }) => ({ ...initialState, categories }));
    },
    openMenu() {
      patchState(store, {});
    },
    closeMenu() {
      patchState(store, {});
    },
  })),
  withHooks({
    onInit(store) {
      store.loadCategories();
    },
  })
);
