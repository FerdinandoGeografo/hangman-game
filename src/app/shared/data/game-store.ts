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
            onClick: () => this.quitGame(),
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

/**
 *  #### STATE ####
 *
 * + categories : Record<string, Option[]> = { "Movies": [{ name: "Lost", selected: true }, { name: "Pickable", selected: false }]}
 * + selectedCategory: Category  = "Movies"
 * + selectedOption: Option['name'] = "Movies",
 * + attemptsLeft: number =  0,
 * + attemptedLetters: : Letter[],
 *
 *  #### ACTION METHODS ####
 * + loadCategories(),  //Load categories data
 * + startGame(category)
 *
 *   //Starts the game:
 *   1. Select random word from the selectable category options.
 *   2. Updates the option of that category setting selected to true,
 *   3. Prepopulate attemptedLetters with two random letters contained in the toGuessLetters array.
 *
 * + attemptLetter(letter),
 *   // Check if the letter is in toGuessLetters to decrease or not the attemptsLeft
 *   // and updates attempted letters with this one.
 *
 * + quitGame(), //Reset the state to initial, but keeping categories.
 * + closeMenu() // Reset current menu items
 * + openMenu() // Set menuItems based on derived state
 *
 * #### DERIVED STATE ####
 * + categoriesNames : All category names
 * + toGuessLetters : All letters splitted from selectedOption
 * + prettyGameStatus:
 *               toGuessLetters are all included in attempted ones -> You win
 *               attemptsLeft is equal to 0 -> You lose
 *               else -> Paused
 */
