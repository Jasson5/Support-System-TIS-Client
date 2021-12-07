import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
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
  public campanyName = "Empresas";
  public isAdmin;
  faUser = faUser;
  constructor(
    public router: Router,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.getRoles().includes('Admin');
    this.userName = this.auth.getUsername();
    this.userRole = this.auth.getRoles();
  }
  
  isInformationRoute() {
    var homeRoute;
    var route = this.router.url
    if (route == '/' || route== '/#glo-plan' || route == '/#doc' || route == '/#schedules' || route == '/#sec-def') {
      homeRoute = true;
    }else{
      homeRoute = false;
    }
    return homeRoute;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  
}
