import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  public sendRegisterForm: FormGroup;
  public user: User;
  public response;
  public isLoading;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.buildForm();

  }

  private buildForm() {
    this.sendRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])[A-Za-z\\d!$%@#£€*?&]{6,}$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    }, { validator: this.passwordMatchValidator("password", "confirmPassword") }
    );
  }

  alertToaster() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  register() {
    this.isLoading = true;
    var user = this.sendRegisterForm.value;
    this.userService.RegisterUser(user).subscribe(() => {
      this.sendRegisterForm.reset();
      this.buildForm();
      this.response = "Cuenta creada exitosamente.";
      this.alertToaster();
      this.auth.login(user.email, user.password).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/home']).finally(() => {
            location.reload();
          });

        });
    },
      error => {
        this.response = error.error.error.message;
        this.alertToaster();
      });
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  get name() {
    return this.sendRegisterForm.get('name');
  }

  get lastName() {
    return this.sendRegisterForm.get('lastName');
  }

  get email() {
    return this.sendRegisterForm.get('email');
  }

  get password() {
    return this.sendRegisterForm.get('password');
  }

  get confirmPassword() {
    return this.sendRegisterForm.get('confirmPassword');
  }

  get companyName() {
    return this.sendRegisterForm.get('companyName');
  }

  get cellPhone() {
    return this.sendRegisterForm.get('cellPhone');
  }
}
