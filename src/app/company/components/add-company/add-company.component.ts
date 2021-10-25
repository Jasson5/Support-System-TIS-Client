import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  
  @ViewChild('searchMember', { static: true }) searchMember: ElementRef;
  public companyEditorForm: FormGroup;
  faPlus = faPlus;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.companyEditorForm = this.formBuilder.group({
      companyShortName: ['', [Validators.required, Validators.maxLength(50)]],
      longCompanyName: ['', [Validators.required, Validators.maxLength(500)]],
      kindOfSociety:['',[Validators.required]]
    });
  }

  addCompany(){    
    var company = this.companyEditorForm.value;
  }

  get companyShortName() {
    return this.companyEditorForm.get('companyShortName');
  }

  get longCompanyName() {
    return this.companyEditorForm.get('longCompanyName');
  }
  
  get kindOfSociety() {
    return this.companyEditorForm.get('kindOfSociety');
  }
}
