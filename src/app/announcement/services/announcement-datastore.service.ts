import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementDatastoreService {

  readonly ROOT_URL = `${environment.BACK_END_HOST}api/1.0/offer/`;
  constructor(private http: HttpClient) { }

  add(offer: Offer) {
    return this.http.post<Offer>(this.ROOT_URL, offer);
  }

  list() {
    return this.http.get<Offer[]>(this.ROOT_URL);
  }
}
