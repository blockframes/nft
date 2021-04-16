import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Title, Attribute } from '../../models/title';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private dbPath = '/titles';  //path to database table

  titlesRef: AngularFireList<Title>;

  constructor(private db: AngularFireDatabase) { 
    this.titlesRef = db.list(this.dbPath);
  }

  create(title: Title): any {
    return this.titlesRef.push(title);
  }  

}
