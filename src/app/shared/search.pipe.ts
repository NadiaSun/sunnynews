import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchKeys'
})
export class SearchPipe implements PipeTransform {

  transform(keys: string[], value: string): string[] {
    if(value.trim()) {
      return keys.filter(key => key.includes(value.trim().toLowerCase()) && value.trim().toLowerCase() !== key);
    }
    return []
  }

}
