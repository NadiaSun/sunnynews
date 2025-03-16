import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, map, of, tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { CATEGORIES, newsData } from 'src/environments/interface';
import { NewsStorageService } from './news-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private message$: Subject<string> = new Subject<string>()
  
  constructor(
    private http: HttpClient,
    private newsStorage: NewsStorageService
  ) {}

  getNews(category: CATEGORIES): Observable<newsData[]> {
    this.newsStorage.setNews([]);

    return this.http.get<{news: newsData[]}>(`${environment.url}latest-news?${this.getCategory(category)}`)
    .pipe(
        map(res => res.news),
        tap(res => {
          this.setMessage('');

          if(res.length === 0) {
            this.setMessage('Sorry, there are no news items in this category.');
          }

          this.newsStorage.setNews(res);
        }),
        catchError(this.errors)
    )
  }

  serchNews(world: string, category?: CATEGORIES): Observable<newsData[]> {
    this.newsStorage.setNews([]);

    const newWorld: string = world.replaceAll(' ', '+AND+');

    return this.http.get<{news: newsData[]}>(`${environment.url}search?keywords=${newWorld}${this.getCategory(category || 'all')}`)
    .pipe(
        map(res => res.news),
        tap(res => {
          this.setMessage('');

          if(res.length === 0) {
            this.setMessage('Sorry, there is no news for this request.');
          }

          this.newsStorage.setNews(res);
        }),
        catchError(this.errors)
    )
  }

  private errors(error: HttpErrorResponse): Observable<any> {
    this.setMessage('Unknown error');

    return of([]);
  }

  getMessage(): Observable<string> {
    return this.message$.asObservable();
  }

  setMessage(message: string): void {
    console.log(message);
    this.message$.next(message);
  }

  private getCategory(category: CATEGORIES): string {
    return category === 'all' ? '' : `category=${category}`;
  }
}
