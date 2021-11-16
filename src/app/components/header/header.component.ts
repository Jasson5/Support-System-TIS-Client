import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userName = "Juan";
  public userRole = "Administrador";
  public campanyName = "Mi Empresa";
  faUser = faUser;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  isInformationRoute() {
    var homeRoute;
    if (this.router.url == '/') {
      homeRoute = false;
    }
    else {
      homeRoute = true;
    }
    return homeRoute;
  }
}
