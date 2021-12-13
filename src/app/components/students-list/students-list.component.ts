import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { User } from 'src/app/authentication/models/user';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/offer/services/offer.service';
import { SemesterService } from 'src/app/semester/services/semester.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  @ViewChild('searchMember', { static: true }) searchMember: ElementRef;
  headers = ["ID", "Nombre", "Apellido", "Correo"];
  estudiante =[
    {nombre: 'Daniel', 
    apellido: 'Janco', 
    correo: '201800140@est.umss.edu'},
    {nombre: 'Pablo', 
    apellido: 'Zelada', 
    correo: '201800141@est.umss.edu'},
  ]
  public offer: Offer = null;
  public users: User[] = [];
  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private semesterService: SemesterService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.offerService.findById(params.id).subscribe(offer => {
        this.offer = offer;
        this.searchUsers('');
        fromEvent(this.searchMember.nativeElement, 'keyup').pipe(
          /*map((event: any) => {
            return event.target.value;
          }),
          debounceTime(1000)*/
        ).subscribe(text => {
          this.searchUsers(''+text);
        });
      });
    });
  }

  searchUsers(value: string = "") {
    
    this.semesterService.listUsersBySemester(value, this.offer.semester.code).subscribe(users => {
      
      this.users = users;
      console.log(this.users);
    });
  }

}
