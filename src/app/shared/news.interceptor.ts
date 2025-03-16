import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyService } from './key.service';

@Injectable()
export class NewsInterceptor implements HttpInterceptor {
  constructor(private KeyService: KeyService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(environment.url)) {
      return this.KeyService.getNewApiKey().pipe(
        switchMap(response => {
          console.log(response)
          request = request.clone({
            setParams: {
              apiKey: response.token
            }
          })

          this.KeyService.usedApiKey(response.id).subscribe(res => {})

          return next.handle(request)
        })
      )
      
      
    }
    return next.handle(request)
  }
}
