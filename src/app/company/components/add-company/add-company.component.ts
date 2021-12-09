import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { User } from 'src/app/authentication/models/user';
import { CompanyStatusEnum } from 'src/app/models/enums/company-status-enum';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/offer/services/offer.service';
import { SemesterService } from 'src/app/semester/services/semester.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  @ViewChild('searchMember', { static: true }) searchMember: ElementRef;
  public companyEditorForm: FormGroup;
  public users: User[] = [];
  public usersSelected: User[] = [];
  public offer: Offer = null;
  faTimes = faTimes;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    public router: Router,
    private offerService: OfferService,
    private semesterService: SemesterService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.offerService.findById(params.id).subscribe(offer => {
        this.offer = offer;
        this.searchUsers('');
        fromEvent(this.searchMember.nativeElement, 'keyup').pipe(
          map((event: any) => {
            return event.target.value;
          }),
          debounceTime(1000)
        ).subscribe(text => {
          this.searchUsers(text);
        });
      });
    });
    this.buildForm();
  }

  buildForm() {
    this.companyEditorForm = this.formBuilder.group({
      companyShortName: ['', [Validators.required, Validators.maxLength(50)]],
      longCompanyName: ['', [Validators.required, Validators.maxLength(500)]],
      kindOfSociety: ['', [Validators.required]]
    });
  }

  searchUsers(value: string = "") {
    this.spinner.show();
    this.semesterService.listUsersBySemester(value, this.offer.semester.code).subscribe(users => {
      this.spinner.hide();
      this.users = users;
    });
  }

  selectUser(user: User) {
    var index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
      this.usersSelected.push(user);
    }
  }

  cancelSelectUser(userSelected: User) {
    var index = this.usersSelected.indexOf(userSelected);
    if (index > -1) {
      this.usersSelected.splice(index, 1);
      this.users.push(userSelected);
    }
  }

  addCompany() {
    var company = this.companyEditorForm.value;
    company.statusId = CompanyStatusEnum.PENDING;
    this.semesterService.FindSemesterByCode(this.offer.semester.code).subscribe(semester => {
      this.companyService.addCompany(company, this.usersSelected, semester).subscribe(()=>{
        this.router.navigate(['/home',this.offer.semester.code ])
      });
    })
  }

  get companyShortName() {
    return this.companyEditorForm.get('companyShortName');
  }

  get longCompanyName() {
    return this.companyEditorForm.get('longCompanyName');
  }

  get kindOfSociety() {
    return this.companyEditorForm.get('kindOfSociety');
  }
}
