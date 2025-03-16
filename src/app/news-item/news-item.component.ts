import { Component, Input } from '@angular/core';
import { newsData } from 'src/environments/interface';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent {
  @Input() new!: newsData;
}
