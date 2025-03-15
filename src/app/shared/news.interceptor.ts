import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class NewsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(environment.url)) {
      const newRequest = request.clone({
        setParams: {
          apiKey: environment.apiKey
        }
      })
      console.log('newRequest')
      return next.handle(newRequest);
    }
    console.log('request')
    return next.handle(request);
  }
}
