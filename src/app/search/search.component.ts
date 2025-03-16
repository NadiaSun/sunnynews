import { Component, EventEmitter, Output } from '@angular/core';
import { keys } from '../shared/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchNewsChange: EventEmitter<string> = new EventEmitter<string>();
  public search: string = '';
  public keys: string[] = keys;

  searchNews(world: string): void {
    if(!world.trim()) {
      return;
    }

    this.searchNewsChange.emit(world.trim());
  }

  upperSearch(searchNew: string): void {
    this.search = searchNew[0].toUpperCase()+searchNew.slice(1);
  }
}
