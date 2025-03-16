import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriesType, newsData } from 'src/app/shared/interfaces/interface';
import { NewsStorageService } from './news-storage.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private message$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private newsStorage: NewsStorageService
  ) {}

  public getNews(category: CategoriesType): Observable<newsData[]> {
    this.newsStorage.setNews([]);

    return this.http
      .get<{
        news: newsData[];
      }>(`${environment.url}latest-news?${this.getCategory(category)}`)
      .pipe(
        map((res) => res.news),
        tap((res) => {
          this.setMessage('');
          this.newsStorage.setNews(res);
        }),
        catchError((error) => this.errors(error))
      );
  }

  public serchNews(
    word: string,
    category?: CategoriesType
  ): Observable<newsData[]> {
    this.newsStorage.setNews([]);

    return this.http
      .get<{
        news: newsData[];
      }>(
        `${environment.url}search?${this.getCategory(category || 'all')}keywords=${this.combiningWords(word)}`
      )
      .pipe(
        map((res) => res.news),
        tap((res) => {
          this.setMessage('');
          this.newsStorage.setNews(res);
        }),
        catchError((error) => this.errors(error))
      );
  }

  public getMessage(): Observable<string> {
    return this.message$.asObservable();
  }

  public setMessage(message: string): void {
    this.message$.next(message);
  }

  private getCategory(category: CategoriesType): string {
    return category === 'all' ? '' : `category=${category}&`;
  }

  private errors(error: HttpErrorResponse): Observable<any> {
    this.setMessage('Unknown error');

    return of([]);
  }

  private combiningWords(word: string): string {
    return word.replaceAll(' ', '+AND+');
  }
}
