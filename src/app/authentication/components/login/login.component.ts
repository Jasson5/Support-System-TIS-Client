import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string;
  public logoUrl: string;
  @ViewChild('userFocus', { static: true }) usernameField: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.logoUrl = environment.LOGO_URL;
    this.buildForm();
    
  }

  //Incializa el formulario de ingreso al sistema con sus respectivas validaciones
  private buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.usernameField.nativeElement.focus();
  }

  //Se ingresa al sistema
  login() {
    this.spinner.show();
    var login = this.loginForm.value;

    //Verifica si los datos son correctos
    this.auth.login(login.username, login.password).subscribe(
      (login) => {
        //Redirige a la vista de Semestres
        this.router.navigate(['/semester-board']).then(() => {
        });
        this.spinner.hide();
      },
      (error) => {
        //Nombre de usuario o contraseña incorrecta.
        this.spinner.hide();
        alert(error.error.error.message);
      }
    );
  }

  showError(error) {
    if (error.ConfirmPassword) {
      return error.ConfirmPassword[0];
    }
    if (error.Password) {
      return error.Password[0];
    }
  }

  //Obtiene el nombre de usuario
  get username() {
    return this.loginForm.get('username');
  }

  //Obtiene la contraseña
  get password() {
    return this.loginForm.get('password');
  }

}
