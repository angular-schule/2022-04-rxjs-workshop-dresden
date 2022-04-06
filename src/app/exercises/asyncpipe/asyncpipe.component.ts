import { ChangeDetectionStrategy, Component } from '@angular/core';
import { timer, Observable, tap, scan, EMPTY, share } from 'rxjs';

@Component({
  selector: 'rxw-fromevent',
  templateUrl: './asyncpipe.component.html',
  styles: ['.big-num {font-size: 120pt}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncpipeComponent {

  result?: number;
  result$?: Observable<number>;

  constructor() {

    /**
     * Verwende die AsyncPipe und verzichte auf den Einsatz von subscribe()!
     */

    /**************!!**************/

     this.result$ = timer(5000, 700).pipe(
      scan((acc, item) => acc + item, 0),
      tap({
        next: e => console.log(e),
        complete: () => console.log('✅ COMPLETE')
      })
     )


     // this.result$.subscribe(e => this.result = e);

    /**************!!**************/
  }

}
