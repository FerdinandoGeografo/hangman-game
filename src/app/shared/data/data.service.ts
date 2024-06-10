import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, concatMap, filter, map, take, tap } from 'rxjs';
import { KeyGame } from '../../game/data/game.const';
import { MenuItem } from '../ui/menu/menu.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #http = inject(HttpClient);

  #store = signal<AppState>({
    categories: [
      {
        name: 'Countries',
        words: [
          {
            name: 'United Kingdom',
            selected: false,
          },
        ],
      },
    ],
    categoriesLoaded: false,
    selectedCategoryIndex: 0,
    currentWord: 'UNITED KINGDOM',
    guessedLetters: ['U', 'N', 'I', 'D'],
    attemptsLeft: 8,
    menuItems: [],
  });

  categories = computed(() => this.#store().categories);
  categoriesLoaded = computed(() => this.#store().categoriesLoaded);
  selectedCategoryIndex = computed(() => this.#store().selectedCategoryIndex);
  currentWord = computed(() => this.#store().currentWord);
  guessedLetters = computed(() => this.#store().guessedLetters);
  attemptsLeft = computed(() => this.#store().attemptsLeft);
  menuItems = computed(() =>
    this.#store().menuItems.filter((el) => el.visible)
  );

  selectedCategory = computed(() =>
    this.categories().at(this.selectedCategoryIndex())
  );

  wordsAvailable = computed(
    () => this.selectedCategory()?.words.filter((el) => !el.selected) || []
  );

  menuOpen = computed(() => this.menuItems().length > 0);

  gameLost = computed(() => this.attemptsLeft() === 0);
  gameWon = computed(
    () =>
      this.currentWord()
        ?.replace(' ', '')
        ?.split('')
        ?.every((el) => this.guessedLetters()?.includes(el)) || false
  );

  gameWonEffect = effect(() => console.log(this.gameWon()));

  //actions
  loadCategories = new Subject<void>();
  selectCategory = new Subject<number>();
  selectAvailableWord = new Subject<void>();
  guessLetter = new Subject<string>();
  openMenu$ = new Subject<void>();

  #closeMenu$ = new Subject<void>();
  #categoriesLoaded = new Subject<Categories>();

  constructor() {
    this.loadCategories
      .pipe(
        takeUntilDestroyed(),
        concatMap(() => this.#http.get<any>('data/data.json')),
        map((data) =>
          Object.entries(data.categories).map(
            ([name, words]) =>
              ({
                name,
                words,
              } as Category)
          )
        ),
        tap((categories) => this.#categoriesLoaded.next(categories))
      )
      .subscribe();

    this.#categoriesLoaded
      .pipe(
        takeUntilDestroyed(),
        tap((categories) =>
          this.#store.update((state) => ({
            ...state,
            categories,
            categoriesLoaded: true,
          }))
        )
      )
      .subscribe();

    this.selectCategory
      .pipe(
        takeUntilDestroyed(),
        tap((index) =>
          this.#store.update((state) => ({
            ...state,
            selectedCategoryIndex: index,
          }))
        ),
        tap(() => this.selectAvailableWord.next())
      )
      .subscribe();

    this.selectAvailableWord
      .pipe(
        takeUntilDestroyed(),
        map(() => {
          const wordIndex = Math.floor(
            Math.random() * this.wordsAvailable().length
          );
          return {
            word: this.selectedCategory()?.words.at(wordIndex)!,
            index: wordIndex,
          };
        }),
        tap(({ word, index }) =>
          this.#store.update((state) => ({
            ...state,
            currentWord: word.name.toUpperCase(),
            guessedLetters: ['U', 'N', 'I', 'D'],
            categories: this.categories().map((el, i) =>
              i === this.selectedCategoryIndex()
                ? {
                    ...el,
                    words: el.words.map((w, i) =>
                      i === index ? { ...w, selected: true } : w
                    ),
                  }
                : el
            ),
            menuItems: [],
            attemptsLeft: 8,
          }))
        )
      )
      .subscribe();

    this.guessLetter
      .pipe(
        takeUntilDestroyed(),
        tap((letter) =>
          this.#store.update((state) => ({
            ...state,
            guessedLetters: [...state.guessedLetters, letter],
            attemptsLeft: state.currentWord?.includes(letter)
              ? state.attemptsLeft
              : state.attemptsLeft - 1,
          }))
        ),
        tap(() => {
          if (this.gameLost() || this.gameWon()) {
            this.openMenu$.next();
          }
        })
      )
      .subscribe();

    this.openMenu$
      .pipe(
        takeUntilDestroyed(),
        tap(() =>
          this.#store.update((state) => ({
            ...state,
            menuItems: [
              {
                label: 'Play Again!',
                onClick: () => this.selectAvailableWord.next(),
                routerLink: '',
                visible: this.gameLost() || this.gameWon(),
              },
              {
                label: 'Continue',
                onClick: () => this.#closeMenu$.next(),
                routerLink: '',
                visible: !this.gameLost() && !this.gameWon(),
              },
              {
                label: 'New Category',
                routerLink: '/categories',
                onClick: () => console.log('STATE TO DESTROY: ', this.#store()),
                visible: true,
              },
              {
                label: 'Quit Game',
                onClick: () => console.log('STATE TO DESTROY', this.#store()),
                routerLink: '/main-menu',
                buttonStyleClass: 'btn--secondary',
                visible: true,
              },
            ],
          }))
        )
      )
      .subscribe();

    this.#closeMenu$
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.#store.update((state) => ({ ...state, menuItems: [] })))
      )
      .subscribe();

    this.loadCategories.next();
  }
}

export interface Word {
  name: string;
  selected: boolean;
}

export type Words = Word[];

export interface Category {
  name: string;
  words: Word[];
}

export type Categories = Category[];

export interface AppState {
  // Categories
  categories: Categories;
  categoriesLoaded: boolean;
  // Game
  selectedCategoryIndex: number;
  currentWord: Word['name'] | null;
  guessedLetters: KeyGame[];
  attemptsLeft: number;
  menuItems: MenuItem[];
}
