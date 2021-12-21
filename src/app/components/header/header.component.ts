import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/authentication/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger('fade',[
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
    )]
})
export class HeaderComponent implements OnInit {

  @ViewChild('stickyMenu') menuElement: ElementRef;
  public userName = "";
  public userRole ;
  public companyName = "Mi Empresa";
  public isAdmin;
  faUser = faUser;
  constructor(
    public router: Router,
    private auth: AuthService, 
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.getRoles().includes('Admin');
    this.userName = this.auth.getUsername();
    if(this.auth.getRoles().includes('Admin')){      
      this.userRole = "Administrador";
      this.companyName = "Empresas";
    }else{
      if(this.auth.getRoles().includes('Frontman')){
        this.userRole = "Representante";
        this.companyName = "Mi Empresa";
      }else{
        if(this.auth.getRoles().includes('Documentary')){
          this.userRole = "Estudiante"
        }
      }      
    }
  }
  
  isInformationRoute() {
    var homeRoute;
    var route = this.router.url;
    if (route == '/' || route== '/#glo-plan' || route == '/#doc' || route == '/#schedules' || route == '/#sec-def') {
      homeRoute = true;
    }else{
      homeRoute = false;
    }
    return homeRoute;
  }

  isNotSemesterBoard() {
    var route = this.router.url;
    if (route == '/semester-board') {
      return false;
    }else{
      return true;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  
}
