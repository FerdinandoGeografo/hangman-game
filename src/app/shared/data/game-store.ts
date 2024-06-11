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

type GameState = {
  categories: Categories;
  selectedCategory: Category | null;
  selectedOption: Option['name'] | null;
  attemptsLeft: number;
  attempted: string[];
};

const initialState: GameState = {
  categories: {},
  selectedCategory: null,
  selectedOption: null,
  attemptsLeft: 8,
  attempted: [],
};

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export type KeyGame = (typeof ALPHABET)[number];

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
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
    startGame(category: Category) {},
    quitGame() {
      patchState(store, ({ categories }) => ({
        ...initialState,
        categories,
      }));
    },
  })),
  withHooks({
    onInit(store) {
      store.loadCategories();
    },
  })
);
