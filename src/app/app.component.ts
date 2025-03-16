import { Component, OnInit } from '@angular/core';
import { NewsService } from './shared/services/news.service';
import { CategoriesType, newsData } from 'src/app/shared/interfaces/interface';
import { NewsStorageService } from './shared/services/news-storage.service';
import { finalize, Observable } from 'rxjs';
import { categoriesName } from './shared/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public data$!: Observable<newsData[]>;
  public message$!: Observable<string>;
  public loading: boolean = false;
  query: string = '';
  category: CategoriesType = 'all';

  constructor(
    private newsService: NewsService,
    private newsStorage: NewsStorageService
  ) {}

  ngOnInit(): void {
    this.data$ = this.newsStorage.getNews();
    this.message$ = this.newsService.getMessage();
    this.loadNews();
  }

  public updateNewsCategory(category: CategoriesType): void {
    this.category = category;
    this.query = '';
    this.loadNews();
  }

  public updateNewsSearch(search: string): void {
    this.query = search;
    if (categoriesName.includes(search.toLowerCase())) {
      this.query = '';
      this.category = search.toLowerCase() as CategoriesType;
    }
    this.loadNews();
  }

  private loadNews(): void {
    this.newsService.setMessage('');
    this.loading = true;
    this.getNews()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        if (res.length === 0) {
          this.newsService.setMessage(
            'Sorry, there is no news for this request.'
          );
        }
      });
  }

  private getNews(): Observable<newsData[]> {
    if (this.query) {
      if (this.category !== 'all') {
        return this.newsService.serchNews(this.query, this.category);
      }
      return this.newsService.serchNews(this.query);
    }
    return this.newsService.getNews(this.category);
  }
}
