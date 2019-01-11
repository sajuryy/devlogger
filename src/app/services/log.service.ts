import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Log } from '../models/Log';

@Injectable()

export class LogService {
  logs: Log[];


  private logSource = new BehaviorSubject<Log>(
    { id: null, text: null, date: null }
  );
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();



  constructor() {
    this.logs = [];
  };


  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    return of(this.logs.sort((a, b) => {
      return new Date(b.date) >= new Date(a.date) ? -1 : 1;
    }));

  };

  setFormLog(log: Log) {
    this.logSource.next(log);
  };

  addLog(log: Log) {
    this.logs.unshift(log);

    // add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));

  };


  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    // update to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  };

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    // delete to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  };


  clearState() {
    this.stateSource.next(true);
  };

}
