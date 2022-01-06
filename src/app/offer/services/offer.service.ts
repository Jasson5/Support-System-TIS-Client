import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { OfferDatastoreService } from './offer-datastore.service';

@Injectable({
  providedIn: 'root'
})

//Esta clase llama a los metodos de OfferDataStore
export class OfferService {
  constructor(private offerDatastoreService: OfferDatastoreService) { }

  public addOffer(offer, semester) {
    let newOffer = new Offer();
    newOffer.description = offer.description;
    newOffer.dateEnd = offer.dateEnd;
    newOffer.documentOfferUrl = offer.thumbnailUrl;
    newOffer.maxUsers = offer.maxUsers;
    newOffer.minUsers = offer.minUsers;
    newOffer.semester = semester;

    return this.offerDatastoreService.add(newOffer);
  }

  public listOffers(semesterCode) {
    return this.offerDatastoreService.list(semesterCode);
  }

  findById(id){
    return this.offerDatastoreService.findById(id);
  }
}
