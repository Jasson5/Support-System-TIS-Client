import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { UserService } from 'src/app/authentication/services/user.service';
import { SemesterStatusEnum } from 'src/app/models/enums/semester-status-enum';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from '../../services/semester.service';

@Component({
  selector: 'app-semesters',
  templateUrl: './semesters.component.html',
  styleUrls: ['./semesters.component.scss']
})
export class SemestersComponent implements OnInit {
  public closeResult = '';
  public codeClass = "";
  public codeClassForJoin = "";
  public className: string = '';
  public textButton: string = "";
  public activeSemesters: Semester[];
  public semestersEnded: Semester[];
  public semesters: Semester[] = [];
  public isAdmin;


  constructor(
    private modalService: NgbModal,
    private semesterService: SemesterService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) { }

  //Se habilita la opcion de Nueva Clase para el Administrador 
  //En caso de ser Estudiante se habilita la opcion de Unirse
  ngOnInit(): void {
    this.isAdmin = this.auth.getRoles().includes('Admin');
    this.textButton = this.isAdmin ? "Nueva Clase" : "Unirse";
    this.listSemesters();
  }

  //Se despliega un modal dependiendo del tipo de usuario
  open(content) {
    this.getRandomCode();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (this.isAdmin) {
        this.addSemester();
      } else {
        this.joinToClass();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //Cierra el modal ya sea presionado ESC o haciendo click fuera del modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //Obtiene un codigo randomico de 8 caracteres
  getRandomCode() {
    this.codeClass = "";
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 8; i++) {
      this.codeClass += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    return this.codeClass;
  }

  //Envia el nuevo semestre al backend 
  addSemester() {
    this.spinner.show();
    this.semesterService.addSemester(this.className, this.codeClass, SemesterStatusEnum.OPEN).subscribe(() => {
      this.listSemesters();
    });
  }

  //Permite al usuario unirse a una clase con el codigo respectivo
  joinToClass() {
    this.spinner.show();
    var userId = this.auth.getUserId();
    this.semesterService.JoinToSemester(userId, this.codeClassForJoin).subscribe(() => {   
      this.listSemesters();    
      this.spinner.hide();
    });
  }

  //Muestra la lista de semestres existentes en la base de datos
  listSemesters() {
    this.spinner.show();
    this.activeSemesters = [];
    this.semestersEnded = [];
    if (this.auth.getRoles().includes('Admin')) {
      this.semesterService.listSemesters().subscribe(semesters => {
        semesters.forEach(semester => {
          if (semester.statusId == SemesterStatusEnum.OPEN) {
            this.activeSemesters.push(semester);
          }
          if (semester.statusId == SemesterStatusEnum.CLOSE) {
            this.semestersEnded.push(semester);
          }
        });
        this.spinner.hide();
      })
    } else {
      this.semesterService.listSemestersByUserId(this.auth.getUserId()).subscribe(semesters => {
        semesters.forEach(semester => {
          if (semester.statusId == SemesterStatusEnum.OPEN) {
            this.activeSemesters.push(semester);
          }
          if (semester.statusId == SemesterStatusEnum.CLOSE) {
            this.semestersEnded.push(semester);
          }
        });        
        this.spinner.hide();
      });
    }
  }

  //Ingresa al semestre escogido
  enterToSemester(code) {    
    localStorage.setItem('semesterCode', code);
    this.router.navigate(['/home', code]);
  }
}
