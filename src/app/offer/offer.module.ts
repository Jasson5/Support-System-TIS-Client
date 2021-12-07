import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { OfferService } from './services/offer.service';
import { OfferDatastoreService } from './services/offer-datastore.service';



@NgModule({
  declarations: [AddOfferComponent],
  imports: [
    CommonModule,    
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    OfferService,
    OfferDatastoreService
  ],  
  exports: [
    AddOfferComponent
  ],
})
export class OfferModule { }
