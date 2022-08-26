import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  ORIGIN_DATE = '2022-01-01';

  constructor() {}

  // ***** DATE FUNCTIONS *****

  todayDateString() {
    const todaysDate = new Date();
    return [todaysDate.toISOString().split('T')[0]].toString();
  }

  // weekNumberBy

  getWeekNumberFromDateRange(startDate: string, endDate: string) {
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);
    const deltaDays = Math.floor(
      (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weekNumber = Math.floor(deltaDays / 7) + 1;
    return weekNumber;
  }
}
