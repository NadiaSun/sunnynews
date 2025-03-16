import { Component } from '@angular/core';
import { NewsService } from '../shared/news.service';
import { newsData } from 'src/environments/interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public search: string = ''
  keys = ["regional", "technology", "lifestyle", "business", "general", "programming", "science", "entertainment", "world", "sports", "finance", "academia", "politics", "health", "opinion", "food", "game", "fashion", "academic", "travel", "culture", "economy", "environment", "art", "music", "CS", "education", "television", "commodity", "movie", "entrepreneur", "review", "auto", "energy", "celebrity", "medical", "gadgets", "design", "security", "mobile", "estate", "funny"];

  constructor(private newsService: NewsService) {}

  searchNews(world: string) {
    if(!world.trim()) {
      return
    }
    this.newsService.serchNews(world.trim()).subscribe({
      next: response => {
        this.newsService.data = response;
        console.log(response)
      },
      error: error => {console.log(error)}
    } )
  }
}
