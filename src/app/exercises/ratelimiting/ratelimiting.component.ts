import { Component } from '@angular/core';
import { Subject, Observable, debounceTime, throttleTime, auditTime, sampleTime } from 'rxjs';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-ratelimiting',
  templateUrl: './ratelimiting.component.html',
  styleUrls: ['./ratelimiting.component.scss']
})
export class RatelimitingComponent {

  scrollContent = new Array(100);
  events$ = new Subject<string>();

  result$: Observable<string>;

  constructor(private es: ExerciseService) {
    /**
     * Durch Scrollen und Buttonklicks werden Events erzeugt.
     *
     * Begrenze die Zahl der ausgegebenen Events mit einem Rate Limiting Operator.
     * - debounceTime: nach Ablauf einer PAUSE den letzten Wert entnehmen
     * - throttleTime: Wert sofort entnehmen, Quelle dann für eine bestimmte Zeit ignorieren
     * - auditTime: bei Event die Quelle überwachen, nach bestimmter Zeit Wert entnehmen
     * - sampleTime: periodisch Werte entnehmen (sofern vorhanden)
     */

    /**************!!**************/

    this.result$ = this.events$.pipe(
    );

    /**************!!**************/
  }

  emitRandomString() {
    const newRandom = this.es.generateRandomString();
    this.events$.next(newRandom);
  }

  emitScrollEvent(e: Event) {
    const timestamp = Math.floor(e.timeStamp);
    this.events$.next('SCROLL ' + timestamp);
  }


}
