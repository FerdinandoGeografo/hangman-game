import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, concatMap, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #http = inject(HttpClient);

  #store = signal<State>({
    categories: [],
    categoriesLoaded: false,
  });

  categories = computed(() => this.#store().categories);
  categoriesLoaded = computed(() => this.#store().categoriesLoaded);

  #load = new Subject<void>();

  constructor() {
    this.#load
      .pipe(takeUntilDestroyed())
      .pipe(
        concatMap(() => this.#http.get<any>('data/data.json')),
        map((data) =>
          Object.entries(data.categories).map(([catName, catWords]) => ({
            name: catName,
            words: catWords,
          }))
        ),
        tap((categories) =>
          this.#store.update((state) => ({
            ...state,
            categories: categories as State['categories'],
            categoriesLoaded: true,
          }))
        )
      )
      .subscribe();

    this.#load.next();
  }
}

export interface State {
  categories: { name: string; words: { name: string; selected: boolean } }[];
  categoriesLoaded: boolean;
}
