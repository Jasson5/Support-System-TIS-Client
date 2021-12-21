import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { Offer } from 'src/app/models/offer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementDatastoreService {

  readonly ROOT_URL = `${environment.BACK_END_HOST}announcement/`;
  constructor(private http: HttpClient) { }

  add(announcement: Announcement) {
    return this.http.post<Offer>(this.ROOT_URL, announcement);
  }

  list(code) {
    return this.http.get<Announcement[]>(this.ROOT_URL + code);
  }
}
