import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { newKey } from 'src/environments/interface';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor(
    private http: HttpClient
  ) { }

  getNewApiKey(): Observable<newKey> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${environment.newApiKey}`,
      'Content-Type': 'application/json'
    })

    return this.http.get<{0: newKey}>(`${environment.urlNewKey}/rest/v1/tokens?select=id,token&used=eq.false&limit=1&apikey=${environment.newApiKey}`, {headers})
    .pipe(
      map(res => res[0]),
      catchError(this.errors)
    )
  }

  usedApiKey(id: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${environment.newApiKey}`,
      'Content-Type': 'application/json'
    })

    return this.http.patch(`${environment.urlNewKey}/rest/v1/tokens?id=eq.${id}&apikey=${environment.newApiKey}`, {used: true, issued_at: new Date()}, {headers})
    .pipe(
      catchError(this.errors)
    )
  }

  private errors(error: HttpErrorResponse): Observable<any> {
    return throwError(error)
  }
}


