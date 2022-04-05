import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    
    const myFancyObs$ = new Observable<string>(sub => {
      sub.next('A');
      sub.next('B');
      sub.next('C');
      sub.complete();
    });

    // of('A', 'B', 'C')
    // from([1,2,3,4,5])
    // interval(1000)
    // timer(3000)

    timer(3000, 500).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });


    /******************************/

    function producer(sub: any) {
      sub.next(Math.random());
      sub.next(5);

      setTimeout(() => {
        sub.next(10);
      }, 2000)

      const myInterval = setInterval(() => {
        const result = Math.random();
        sub.next(result);
        console.log('INNER', result);
      }, 1000)

      // Teardown Logic
      return () => {
        console.log('Teardown');
        clearInterval(myInterval);
      }
    }


    const obs = {
      next: (e: any) => console.log(e),
      // error: (err: any) => console.error(err),
      // complete: () => console.log('COMPLETE'),
    }

    const myObs$ = new Observable(producer);
    // const subscription = myObs$.subscribe(obs);


    /*setTimeout(() => {
      subscription.unsubscribe();
    }, 10000)*/


    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
