import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _http: HttpClient) { }

  getPdf(
    semesterCode = ""
  ) {
    var url = environment.BACK_END_HOST + 'report/print';
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');

    return this._http.post(url, { semesterCode }, { headers: headers, responseType: 'blob' });
  }
}
