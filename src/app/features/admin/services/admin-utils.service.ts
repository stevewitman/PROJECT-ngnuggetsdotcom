import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminUtilsService {

  urlContains(fullstring: string, substring: string) {
    return fullstring.indexOf(substring) !== -1 ? true : false;
  }
  
}
