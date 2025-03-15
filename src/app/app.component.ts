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
