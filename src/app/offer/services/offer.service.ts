import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { OfferDatastoreService } from './offer-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private offerDatastoreService: OfferDatastoreService) { }

  public addOffer(offer) {
    let newOffer = new Offer();
    newOffer.description = offer.description;
    newOffer.dateEnd = offer.dateEnd;
    newOffer.documentOfferUrl = offer.thumbnailUrl;
    newOffer.maxUsers = offer.maxUsers;
    newOffer.minUsers = offer.minUsers;

    return this.offerDatastoreService.add(newOffer);
  }

  public listOffers() {
    return this.offerDatastoreService.list();
  }
}
