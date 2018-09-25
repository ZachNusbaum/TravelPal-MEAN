import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { SavedComparison } from './saved-comparison';

@Injectable({
  providedIn: 'root'
})
export class MongoService {
  base_uri = environment.base_uri;

  constructor(private http: HttpClient) { }

  public addNew(comparison: SavedComparison) {
    let uri = this.base_uri;
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(uri, comparison, {headers: headers});
  }
}
