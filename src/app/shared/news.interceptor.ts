import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyService } from './key.service';

@Injectable()
export class NewsInterceptor implements HttpInterceptor {
  constructor(private KeyService: KeyService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(environment.url)) {
      request = request.clone({
        setParams: {
          apiKey: environment.apiKey
        }
      })
      return next.handle(request)
    }
    return next.handle(request)
  }
}
