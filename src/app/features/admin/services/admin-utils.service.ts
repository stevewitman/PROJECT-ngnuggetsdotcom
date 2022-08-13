import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminUtilsService {
  /**
   * Returns true if fullstring contains substring
   *
   * @param {string} fullstring - search in this string
   * @param {string} substring - looking for this string
   * @returns {boolean}
   */
  urlContains(fullstring: string, substring: string) {
    return fullstring.indexOf(substring) !== -1 ? true : false;
  }

  todayDateString() {
    const todaysDate = new Date();
    return [todaysDate.toISOString().split('T')[0]].toString();
  }

  dateStringFromOffset(offset: number) {
   return new Date(new Date().setDate(new Date().getDate() + offset))
    .toISOString()
    .split('T')[0]
    .toString();
  }
}
