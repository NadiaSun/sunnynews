import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyService } from '../services/key.service';

@Injectable()
export class NewsInterceptor implements HttpInterceptor {
  constructor(private KeyService: KeyService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes(environment.url)) {
      return this.KeyService.getNewApiKey().pipe(
        switchMap((response) => {
          request = request.clone({
            setParams: {
              apiKey: response.token,
            },
          });

          this.KeyService.usedApiKey(response.id).subscribe();

          return next.handle(request);
        })
      );
    }

    if (request.url.includes(environment.urlNewKey)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${environment.newApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      return next.handle(request);
    }

    return next.handle(request);
  }
}
