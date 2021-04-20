import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import type { Observable } from 'rxjs';
import { Title } from '@nft/model/title'

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private dbPath = '/titles';  //path to database table

  titlesRef: AngularFireList<Title>;

  constructor(private db: AngularFireDatabase) {
    this.titlesRef = db.list(this.dbPath);
  }

  getAllTitles(): AngularFireList<Title> {
    return this.titlesRef;
  }

  getTitle(id: string): Observable<any> {
    // TODO read seems to not work
    const doc = this.dbPath + '/' + id;
    return this.db.object(doc).valueChanges()
  }

  create(title: Title): any {
    return this.titlesRef.push(title);
  }

  update(key: string, value: any): Promise<void> {
    return this.titlesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.titlesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.titlesRef.remove();
  }
}
