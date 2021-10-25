import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.scss']
})
export class ViewCompaniesComponent implements OnInit {

  faPlus = faPlus;
  constructor() { }

  ngOnInit(): void {
  }

}
