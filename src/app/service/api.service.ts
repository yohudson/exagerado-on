import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url_dev = 'http://localhost:3000/'
  url_prod = 'https://api-exagerado-on.herokuapp.com/'

  url = this.url_prod;

  constructor(
    private http: HttpClient
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

  Get = (ext:any): Observable<any> => {
    return this.http.get(this.url+ext)
    .pipe(
      catchError(this.handleError)
    )
  }

  Post = (ext:any, data:any): Observable<any> => {
    return this.http.post(this.url+ext, data)
    .pipe(
        catchError(this.handleError)
      )
  }

  handleError = (error: HttpErrorResponse) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      Swal.close()
    } else {
      errorMessage = `${error.status}: ${error.message}`;
      Swal.close()
    }
    console.log(errorMessage);
    Swal.close()
    return throwError(errorMessage);
  };
}
