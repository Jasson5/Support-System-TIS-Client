import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-pending-companies',
  templateUrl: './view-pending-companies.component.html',
  styleUrls: ['./view-pending-companies.component.scss']
})
export class ViewPendingCompaniesComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;
  constructor() { }

  ngOnInit(): void {
  }

}
