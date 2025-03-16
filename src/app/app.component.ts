import { Component, OnInit } from '@angular/core';
import { NewsService } from './shared/news.service';
import { categories, newsData } from 'src/environments/interface';
import { KeyService } from './shared/key.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public newsService: NewsService) {}
  ngOnInit(): void {
    this.newsService.getNews('all').subscribe(response => {
      this.newsService.data = response
    })
  }
}
