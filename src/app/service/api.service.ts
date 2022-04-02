import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://api-exagerado-on.herokuapp.com/'

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  Get(ext:any): Observable<any> {
    return this.httpClient.get(this.url+ext)
    .pipe(
      catchError(this.handleError)
    )
  }

  Post(ext:any, data:any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.url+ext, JSON.stringify(data)).
      pipe(
        catchError(this.handleError)
      )
    })
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
