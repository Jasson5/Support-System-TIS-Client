import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferDatastoreService {


  //Se define la ruta del EndPoint
  readonly ROOT_URL = `${environment.BACK_END_HOST}offer/`;
  constructor(private http: HttpClient) { }

  //Se envia la convocatoria al backend
  add(offer: Offer) {
    return this.http.post<Offer>(this.ROOT_URL, offer);
  }

  //Obtiene la lista de Convocatorias y/o Anuncios
  list(semesterCode) {
    return this.http.get<Offer[]>(this.ROOT_URL + semesterCode);
  }

  //Obtiene el id de una Convocatoria 
  findById(id){
    return this.http.get<Offer>(this.ROOT_URL + 'find-by-id/' + id);
  }
}