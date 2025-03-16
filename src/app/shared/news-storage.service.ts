import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { newsData } from 'src/environments/interface';

@Injectable({
  providedIn: 'root'
})
export class NewsStorageService {
  private newsStorage: Subject<newsData[]> = new Subject<newsData[]>();

  getNews(): Observable<newsData[]> {
    return this.newsStorage.asObservable();
  }

  setNews(news: newsData[]): void {
    this.newsStorage.next(news);
  }
}
