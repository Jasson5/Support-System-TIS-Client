import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  // constructor(public auth: AuthService, public router: Router) { }

  // canActivate(route: ActivatedRouteSnapshot): boolean {
  //   if (this.auth.tokenHasExpired()) {
  //     this.auth.logout();
  //   }

  //   if (!this.auth.isAuthenticated()) {
  //     this.router.navigate(['login']);

  //     return false;
  //   }

  //   if (route.data.roles) {
  //     var splittedRoles = route.data.roles.split(",");
  //     var result = splittedRoles.some(r => this.auth.getRoles().includes(r))

  //     if (!result) {
  //       this.router.navigate(['/']);
  //     }
  //   }

    //return true;
  //}
}
