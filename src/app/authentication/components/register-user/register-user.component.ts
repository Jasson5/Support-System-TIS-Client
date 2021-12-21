import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.buildForm();

  }

  private buildForm() {
    this.sendRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])[A-Za-z\\d!$%@#£€*?&]{6,}$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    }, { validator: this.passwordMatchValidator("password", "confirmPassword") }
    );
  }


  register() {    
    this.spinner.show();
    var user = this.sendRegisterForm.value;
    this.userService.RegisterUser(user).subscribe(() => {
      this.auth.login(user.email, user.password).subscribe(
        () => {
          this.router.navigate(['/semester-board']).finally(() => {
            this.spinner.hide();
            location.reload();
          });

        });
    },
      error => {
        this.spinner.hide();
        alert(error.error.error.message);
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
