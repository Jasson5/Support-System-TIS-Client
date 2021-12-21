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

  ngOnInit(): void {
    console.log(this.data)
  }

}
