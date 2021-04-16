import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  titles: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
  }

  getTitles(): Observable<any> {
    this.titles = this.db.list('titles');
    return this.titles.valueChanges();
  }

}
