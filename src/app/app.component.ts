import { Component, OnInit } from '@angular/core';
import { NewsService } from './shared/news.service';
import { CATEGORIES, newsData } from 'src/environments/interface';
import { NewsStorageService } from './shared/news-storage.service';
import { finalize, Observable } from 'rxjs';
import { keys } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public data$!: Observable<newsData[]>;
  public message$!: Observable<string>;
  public loading: boolean = false;
  query: string = '';
  category: CATEGORIES = 'all';

  constructor(private newsService: NewsService, private newsStorage: NewsStorageService) {}

  ngOnInit(): void {
    this.data$ = this.newsStorage.getNews();
    this.message$ = this.newsService.getMessage();
    this.loadNews();
  }

  updateNewsCategory(category: CATEGORIES): void {
    this.category = category;
    this.query = '';
    this.loadNews();
  }

  updateNewsSearch(search: string): void {
    this.query = search;
    if(keys.includes(search.toLowerCase())) {
      this.query = '';
      this.category = search.toLowerCase() as CATEGORIES;
    }
    this.loadNews();
  }

  loadNews(): void {
    this.newsService.setMessage('');
    this.loading = true;
    this.getNews().pipe(
      finalize(() => this.loading = false)
    ).subscribe();
  }

  getNews(): Observable<newsData[]> {
    if(this.query) {
      if(this.category !== 'all') {
        return this.newsService.serchNews(this.query, this.category);
      }
      return this.newsService.serchNews(this.query);
    }
    return this.newsService.getNews(this.category);
  }
}
