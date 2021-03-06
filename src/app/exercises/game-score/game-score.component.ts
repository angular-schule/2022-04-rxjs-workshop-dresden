import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, of } from 'rxjs';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;
  finalScore?: number;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den aktuellen und den finalen Punktestand zu ermitteln ...
     */

    /******************************/

    this.score$.pipe(
      scan((acc, item) => acc + item, 0)
    ).subscribe(score => {
      this.currentScore = score;
    });

    this.score$.pipe(
      reduce((acc, item) => acc + item, 0)
    ).subscribe(score => {
      this.finalScore = score;
    });



    [1,2,3,4,5].reduce((acc, item) => {
      return acc + item;
    }); // 15


    /******************************/

    of(
      'SETCITYLEIPZIG', // { type: 'SETCITY', data: 'Leipzig' }
      'SETNAMEFM',
      'SETCITYDD',
      'SETFRANG',
      'SETNAMEOTTO'
    ).pipe(
      scan((acc, message) => {
        switch (message) {
          case 'SETCITYLEIPZIG': return { ...acc, city: 'Leipzig', state: 'Saxony' };
          case 'SETCITYDD': return { ...acc, city: 'Dresden', state: 'Saxony' };
          case 'SETNAMEOTTO': return { ...acc, name: 'Otto' };
          case 'SETFOO': return { ...acc, foo: 'bar' };
          default: return acc;
        }
      }, { city: 'Hamburg', name: 'Adrian' })
    ).subscribe(e => console.log(e))



    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
