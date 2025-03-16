import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { newsData } from 'src/app/shared/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class NewsStorageService {
  private newsStorage: Subject<newsData[]> = new Subject<newsData[]>();

  public getNews(): Observable<newsData[]> {
    return this.newsStorage.asObservable();
  }

  public setNews(news: newsData[]): void {
    this.newsStorage.next(news);
  }
}
