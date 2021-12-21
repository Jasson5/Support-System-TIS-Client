import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { CompanyService } from 'src/app/company/services/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  public companyName = "Selecciones una empresa"
  public isAdmin;
  public companies: Company[] = [];
  public company: Company = null;  
  public reloadCompany: Subject<boolean> = new Subject<boolean>();

  constructor(
    private auth: AuthService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.getRoles().includes('Admin');
    this.companyService.findCompaniesBySemester(this.auth.getSemester()).subscribe((company) => {
      this.companies = company;

    })
  }

  selectCompany(company){
    this.company = company;
    this.companyName = company.longName;
    this.reloadCompany.next(true);
  }
}
