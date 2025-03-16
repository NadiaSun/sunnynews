import { Component, EventEmitter, Output } from '@angular/core';
import {
  CategoriesType,
  categoriesInfo,
} from 'src/app/shared/interfaces/interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  @Output() categoryNews: EventEmitter<CategoriesType> =
    new EventEmitter<CategoriesType>();

  public categories: categoriesInfo[] = [
    { id: 'all', title: 'Home' },
    { id: 'sports', title: 'Sport' },
    { id: 'business', title: 'Business' },
    { id: 'health', title: 'Medicine and health' },
    { id: 'technology', title: 'Technologies' },
  ];

  public getNewsByCategories(category: CategoriesType): void {
    this.categoryNews.emit(category);
  }
}
