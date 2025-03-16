import { Component } from '@angular/core';
import { categories, newsData } from 'src/environments/interface';
import { NewsService } from '../shared/news.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  constructor(
    private newsService: NewsService
  ) {

  }
  getNewsByCategories(path: categories) {
    this.newsService.getNews(path).subscribe({
      next: response => {
        this.newsService.d.next(response);
      },
      error: error => {console.log(error)}
    } )
  }
}
