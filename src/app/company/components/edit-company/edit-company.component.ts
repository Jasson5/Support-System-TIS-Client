import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  public eCompany: FormGroup;

  public listStudents = [
    {
      name:'Daniel Romulo Mendoza Janco'
    },
    {
      name: 'Amilcar Flores Llanque'
    },
    {
      name: 'Camilo Mauricio Maldonado'
    },
    {
      name: 'Andrea Flores'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    ){ }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.eCompany = this.formBuilder.group({
      direction: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(500)]],
      socio1:['',[Validators.required]],
      socio2:['',[Validators.required]],
      socio3:['',[Validators.required]],
      socio4:['',[Validators.required]],
      socio5:['',[Validators.required]]
    });
  }

  get companyDirection() {
    return this.eCompany.get('direction');
  }
  get companyEmail() {
    return this.eCompany.get('email');
  }
  get companySocio1() {
    return this.eCompany.get('socio1');
  }
  get companySocio2() {
    return this.eCompany.get('socio2');
  }
  get companySocio3() {
    return this.eCompany.get('socio3');
  }
  get companySocio4() {
    return this.eCompany.get('socio4');
  }
  get companySocio5() {
    return this.eCompany.get('socio5');
  }
}
