import { Component, EventEmitter, Output } from '@angular/core';
import { CATEGORIES, categoriesInfo } from 'src/environments/interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @Output() categoryNews: EventEmitter<CATEGORIES> = new EventEmitter<CATEGORIES>();

  public categories: categoriesInfo[] = [
    {id: 'all', title: 'Home'},
    {id: 'sports', title: 'Sport'},
    {id: 'business', title: 'Business'},
    {id: 'health', title: 'Medicine and health'},
    {id: 'technology', title: 'Technologies'}
  ]

  getNewsByCategories(category: CATEGORIES): void {
    this.categoryNews.emit(category);
  }
}
