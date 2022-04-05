import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, Subject, Observable, NEVER } from 'rxjs';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.es.randomError().pipe(
      // retry(5),
      catchError(err => {
        // Fehler weiterwerfen
        // return new Observable(sub => sub.error('Böser Fehler!'));
        // return throwError(() => 'Böser Fehler!');
        // throw 'Noch ein Fehler!'; // empfohlen!


        // Fehler ersetzen
        // return of('Fehler nicht mehr vorhanden!', '😻');

        // Fehler ignorieren
        // return '';
        // return [];
        // return of();
        return EMPTY; // keine Werte, dann complete
        // return NEVER; // keine Werte, kein complete
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}
