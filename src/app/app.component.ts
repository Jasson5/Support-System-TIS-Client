import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'suport-system';
  constructor(public router: Router){}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  //Compara la ruta actual con las posteriormente descritas para ocultar o mostrar el Header
  isLoginComp() {
    var homeRoute;
    var route = this.router.url;
    if (route == '/login' || route== '/register-user') {
      homeRoute = true;
    }else{
      homeRoute = false;
    }
    return homeRoute;
  }

}
