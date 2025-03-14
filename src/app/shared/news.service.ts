import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { categories, newsData } from 'src/environments/interface';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  getNews(path: categories): Observable<newsData[]> {
    const category = path === 'all' ? '' : `category=${path}`
    return this.http.get<{news: newsData[]}>(
        `${environment.url}latest-news?${category}`
    )
    .pipe(
        map(res => res.news)
    )
  }
  serchNews(world: string): Observable<newsData[]> {
    const newWorld: string = world.replaceAll(' ', '+')
    return this.http.get<{news: newsData[]}>(`${environment.url}latest-news?keywords=${newWorld}`)
    .pipe(
        map(res => res.news),
        catchError(this.errors.bind(this))
    )
  }

  private errors(error: HttpErrorResponse): Observable<any> {
    console.log(error)
    return throwError(error)
  }
}
