import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userName = "Juan";
  public userRole = "Administrador";
  public campanyName = "Empresas";
  faUser = faUser;
  constructor(
    public router: Router,
    private auth: AuthService
    ) { }

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

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
