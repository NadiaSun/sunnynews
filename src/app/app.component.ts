import { Component, OnInit } from '@angular/core';
import { NewsService } from './shared/news.service';
import { categories, newsData } from 'src/environments/interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public data: newsData[] = []
  public search: string = ''
  keys = ["regional", "technology", "lifestyle", "business", "general", "programming", "science", "entertainment", "world", "sports", "finance", "academia", "politics", "health", "opinion", "food", "game", "fashion", "academic", "travel", "culture", "economy", "environment", "art", "music", "CS", "education", "television", "commodity", "movie", "entrepreneur", "review", "auto", "energy", "celebrity", "medical", "gadgets", "design", "security", "mobile", "estate", "funny"];
  constructor(private NewsService: NewsService ) {

  }
  ngOnInit(): void {
  }

  getNewsByCategories(path: categories) {
    this.NewsService.getNews(path).subscribe(response => {
      this.data = response;
      console.log(response)
    })
  }
  searchNews(world: string) {
    if(!world.trim()) {
      return
    }
    this.NewsService.serchNews(world.trim()).subscribe(response => {
      this.data = response;
      console.log(response)
    })
  }
}
