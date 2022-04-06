import { Component } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, partition, switchMap, tap } from 'rxjs';
import { Book } from './book';

@Component({
  selector: 'rxw-typeahead',
  templateUrl: './typeahead.component.html',
})
export class TypeaheadComponent {

  searchControl = new FormControl('');
  results$: Observable<Book[]>;
  loading = false;

  constructor(private ts: TypeaheadService) {
    const searchInput$: Observable<string> = this.searchControl.valueChanges;

    /**
     * Baue eine TypeAhead-Suche, die während der Eingabe eine Suche gegen unsere Buch-API ausführt.
     *
     * Die Eingabewerte aus dem Formular werden durch das Observable searchInput$ bekanntgegeben.
     * Zur Suche soll der Service TypeaheadService verwendet werden, er hat die Methode this.ts.search(term: string).
     * Die aktuellen Ergebnisse sollen im Property this.results gespeichert werden.
     * Der Lade-Indikator wird angezeigt, wenn das Property loading den Wert true hat.
     *
     * Extra: Refaktorisiere den Code und nutze die AsyncPipe von Angular, um die Subscription aufzubauen.
     */

    /******************************/

    /*
    - Suchbegriffe searchInput$
    - SB mindestens 3 Zeichen lang
    - ersten wenn Nutzer die Finger stillhält, soll Suche abgeschickt werden
    - niemals zwei gleiche SB nacheinander gesucht werden
    - Suche über HTTP starten
    - Ergebnisse anzeigen
    - Extra: AsyncPipe
    - Extra: Ladeanzeige
    */

    /*this.results$ = searchInput$.pipe(
      filter(term => term.length >= 3),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(term => this.ts.search(term)),
      tap(() => this.loading = false),
    );*/

    const [longTerms$, shortTerms$] = partition(searchInput$, (term: string) => term.length >= 3);

    const realResults$ = longTerms$.pipe(
      debounceTime(1000),
      tap(() => this.loading = true),
      switchMap(term => this.ts.search(term)),
      tap(() => this.loading = false),
    );

    const emptyResults$ = shortTerms$.pipe(map(() => []));

    this.results$ = merge(realResults$, emptyResults$);

    /******************************/
  }

  formatAuthors(authors: string[]) {
    return Array.isArray(authors) ? authors.join(', ') : '';
  }

}
