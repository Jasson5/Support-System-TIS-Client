import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company-detail-modal',
  templateUrl: './company-detail-modal.component.html',
  styleUrls: ['./company-detail-modal.component.scss']
})
export class CompanyDetailModalComponent implements OnInit {
  
  @Input() public data: any;

  constructor(
    public activeModal: NgbActiveModal) { }

  //Muestra los detalles de una compañia: Semestre y miembros de la misma
  ngOnInit(): void {
    console.log(this.data)
  }

}
