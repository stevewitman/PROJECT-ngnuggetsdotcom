import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should return 1 Sat, 2022-01-01', () => {
    expect(
      service.getWeekNumberFromDateRange('2022-01-01', '2022-01-01')
    ).toEqual(1);
  });

  it('should return 1 Fri, 2022-01-07', () => {
    expect(
      service.getWeekNumberFromDateRange('2022-01-01', '2022-01-07')
    ).toEqual(1);
  });

  it('should return 2 Sat, 2022-01-08', () => {
    expect(
      service.getWeekNumberFromDateRange('2022-01-01', '2022-01-08')
    ).toEqual(2);
  });

  it('should return 55 for Fri, 2023-01-20', () => {
    expect(
      service.getWeekNumberFromDateRange('2022-01-01', '2023-01-20')
    ).toEqual(55);
  });

  it('should return 56 for Sat, 2023-01-20', () => {
    expect(
      service.getWeekNumberFromDateRange('2022-01-01', '2023-01-21')
    ).toEqual(56);
  });

  it('should return 115 for Fri, 2024-03-01 (Leap Year)', () => {
    expect(
      service.getWeekNumberFromDateRange('2022-01-01', '2024-03-01')
    ).toEqual(113);
  });

  it('should return 116 for Sat, 2024-03-02 (Leap Year)', () => {
    expect(
      service.getWeekNumberFromDateRange('2022-01-01', '2024-03-02')
    ).toEqual(114);
  });
});
