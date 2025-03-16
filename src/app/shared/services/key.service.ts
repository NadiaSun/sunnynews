import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { newKey } from 'src/app/shared/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  constructor(private http: HttpClient) {}

  public getNewApiKey(): Observable<newKey> {
    return this.http
      .get<{
        0: newKey;
      }>(
        `${environment.urlNewKey}/rest/v1/tokens?select=id,token&used=eq.false&limit=1&apikey=${environment.newApiKey}`
      )
      .pipe(
        map((res) => res[0]),
        catchError(this.errors)
      );
  }

  public usedApiKey(id: number): Observable<any> {
    return this.http
      .patch(
        `${environment.urlNewKey}/rest/v1/tokens?id=eq.${id}&apikey=${environment.newApiKey}`,
        { used: true, issued_at: new Date() }
      )
      .pipe(catchError(this.errors));
  }

  private errors(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }
}
