import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://app.swaggerhub.com/apis/hudson.coelho/exageradoon/1.0.0'

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json' 
    })
  }

  Get(ext:any): Observable<any> {
    return this.httpClient.get(this.url+ext)
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      Swal.close()
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      Swal.close()
    }
    console.log(errorMessage);
    Swal.close()
    return throwError(errorMessage);
  };
}
