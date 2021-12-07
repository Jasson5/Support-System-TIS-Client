import { Injectable } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { Offer } from 'src/app/models/offer';
import { AnnouncementDatastoreService } from './announcement-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private announcementDatastoreService: AnnouncementDatastoreService) { }

  public addAnnouncement(announcement) {
    let newAnnouncement = new Announcement();
    newAnnouncement.description = announcement.description;
    newAnnouncement.documentUrl = announcement.thumbnailUrl;

    return this.announcementDatastoreService.add(newAnnouncement);
  }

  public listAnnouncements() {
    return this.announcementDatastoreService.list();
  }
}

