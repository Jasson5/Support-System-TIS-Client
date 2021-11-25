import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { AnnouncementDatastoreService } from './announcement-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private announcementDatastoreService: AnnouncementDatastoreService) { }

  public addOffer(offer) {
    let newOffer = new Offer();
    newOffer.dateOffer = offer.dateOffer;
    newOffer.descriptionOffer = offer.description;
    newOffer.minOffer = offer.minPartner;
    newOffer.maxOffer =offer.maxPartner;
    newOffer.fileOffer = offer.thumbnailUrl;

    return this.announcementDatastoreService.add(newOffer);
  }

  public listOffers() {
    return this.announcementDatastoreService.list();
  }
}

