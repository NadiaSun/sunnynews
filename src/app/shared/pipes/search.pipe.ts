import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchKeys',
})
export class SearchPipe implements PipeTransform {
  transform(categories: string[], str: string): string[] {
    const clearedStr = str.trim().toLowerCase();

    if (str.trim()) {
      return categories.filter(
        (category) => category.includes(clearedStr) && clearedStr !== category
      );
    }

    return [];
  }
}
