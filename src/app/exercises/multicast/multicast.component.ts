import { Component } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, connectable, EMPTY, shareReplay } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'rxw-multicast',
  templateUrl: './multicast.component.html',
})
export class MulticastComponent {

  listeners: string[] = [];
  logStream$ = new ReplaySubject<string>();

  measureValues$: Subject<number>;

  private books$?: Observable<any[]>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService, private http: HttpClient) {
    /**************!!**************/

    /*this.measureValues$ = this.mvs.getValues().pipe(share({
      connector: () => new ReplaySubject(1)
    }));*/

    /*const connectable$  = connectable(this.mvs.getValues());
    this.measureValues$ = connectable$;

    setTimeout(() => {
      console.log('CONNECT');
      connectable$.connect();
    }, 7000);*/



    // this.measureValues$ = new Subject();
    // this.measureValues$ = new BehaviorSubject(100); // .value // .getValue()
    this.measureValues$ = new ReplaySubject(2);
    this.mvs.getValues().subscribe(this.measureValues$);


    setTimeout(() => {
      this.measureValues$.complete();
      console.log('SUBJECT COMPLETE')
    }, 7000);

    /**************!!**************/

  }

  getBooks() {
    if (!this.books$) {
      this.books$ = this.http.get<any[]>('https://api.angular.schule/books').pipe(shareReplay(1));
    }

    return this.books$;
  }

  addListener() {
    this.listeners.push(this.es.generateRandomString());
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString();
    this.measureValues$.subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

}
