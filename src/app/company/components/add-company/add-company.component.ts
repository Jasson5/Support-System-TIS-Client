import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Role } from 'src/app/authentication/models/role';
import { User } from 'src/app/authentication/models/user';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { UserService } from 'src/app/authentication/services/user.service';
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
  public myAccount: User;
  public offer: Offer = null;
  faTimes = faTimes;
  public me;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    public router: Router,
    private offerService: OfferService,
    private semesterService: SemesterService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private auth: AuthService
  ) { }

  //Obtiene la lista de estudiante segun el semestre que no pertenezcan a una compañia
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.spinner.show();
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

  //Inicializa el formulario con sus respectivas validaciones
  buildForm() {
    this.companyEditorForm = this.formBuilder.group({
      companyShortName: ['', [Validators.required, Validators.maxLength(50)]],
      longCompanyName: ['', [Validators.required, Validators.maxLength(500)]],
      kindOfSociety: ['', [Validators.required]]
    });
  }

  //Filtra la lista de usuarios segun al nombre introducido en el campo de busqueda
  searchUsers(value: string = "") {
    this.spinner.show();
    this.semesterService.listUsersBySemester(value, this.offer.semester.code).subscribe(users => {
      this.users = users;
      if (!this.auth.getRoles().includes('Admin')) {
        this.userService.findById(this.auth.getUserId()).subscribe(user => {
          this.me = user.email;
          this.myAccount = user;
          var rerult = this.users.find(u => u.email == user.email);
          var index = this.users.indexOf(rerult);
          this.users.splice(index, 1);
        });
      }
      this.spinner.hide();
    });
  }

  // Añade en la lista de miembros al usuario seleccionado
  selectUser(user: User) {
    if (this.usersSelected.length + 1 < this.offer.maxUsers) {
      var index = this.users.indexOf(user);
      if (index > -1) {
        this.users.splice(index, 1);
        var role = new Role();
        var roles: Role[] = [];
        role.name = "Documentador";
        roles.push(role);
        user.roles = roles;
        this.usersSelected.push(user);
      }
    }
  }

  //Elimina de la lista de miembros al usuario seleccionado
  cancelSelectUser(userSelected: User) {
    var index = this.usersSelected.indexOf(userSelected);
    if (index > -1) {
      this.usersSelected.splice(index, 1);
      this.users.push(userSelected);
    }
  }

  //Registra una nueva compañia
  addCompany() {
    this.spinner.show();
    var company = this.companyEditorForm.value;
    company.statusId = CompanyStatusEnum.PENDING;
    if (!this.auth.getRoles().includes('Admin')) {
      var role = new Role();
      var roles: Role[] = [];
      role.name = "Representante";
      roles.push(role);
      this.myAccount.roles = roles;
      this.usersSelected.push(this.myAccount);
    }
    //Verifica la cantidad minima de usuarios para una compañia
    if (this.usersSelected.length >= this.offer.minUsers) {
      this.semesterService.FindSemesterByCode(this.offer.semester.code).subscribe(semester => {
        this.companyService.addCompany(company, this.usersSelected, semester).subscribe(() => {
          this.spinner.hide();
          this.router.navigate(['/home', this.offer.semester.code])
        },
          error => {
            this.spinner.hide();
            alert(error.error.error.message)
            location.reload();
          });
      })
    }else {
      alert("El minimo de usuarios es: " + this.offer.minUsers );
      this.spinner.hide();
      location.reload();
    }
  }

  //Obtiene el nombre de corto de la compañia
  get companyShortName() {
    return this.companyEditorForm.get('companyShortName');
  }
  //Obtiene el nombre de largo de la compañia
  get longCompanyName() {
    return this.companyEditorForm.get('longCompanyName');
  }
  //Obtiene el tipo de sociedad de la compañia
  get kindOfSociety() {
    return this.companyEditorForm.get('kindOfSociety');
  }
}
