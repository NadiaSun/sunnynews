import { Component, EventEmitter, Output } from '@angular/core';
import { categoriesName } from '../../shared/constants/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() searchNewsChange: EventEmitter<string> = new EventEmitter<string>();
  public search: string = '';
  public keys: string[] = categoriesName;

  public searchNews(world: string): void {
    if (!world.trim()) {
      return;
    }

    this.searchNewsChange.emit(world.trim());
  }

  public updateSearch(searchNew: string): void {
    this.search = searchNew;
  }
}
