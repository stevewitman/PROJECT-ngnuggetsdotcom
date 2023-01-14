import { Injectable } from '@angular/core';

import { Firestore, doc, docData } from '@angular/fire/firestore';
import {
  Observable,
  of,
  map,
  mergeMap,
  groupBy,
  zip,
  toArray,
  BehaviorSubject,
  from,
} from 'rxjs';

import { DailyPost, Post } from '../models/post';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  nextWeekToLoad = 999;
  postsLoadedArray: Post[] = [];
  postsLoadedByDayArray: DailyPost[] = [];
  private posts$ = new BehaviorSubject<Post[]>([]);
  private postsByDay$ = new BehaviorSubject<DailyPost[]>([]);
  private isLoadingPosts$ = new BehaviorSubject<boolean>(false);

  constructor(
    private firestore: Firestore,
    private utilsService: UtilsService
  ) {}

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  getPostsByDay(): Observable<DailyPost[]> {
    return this.postsByDay$;
  }

  getIsLoadingPosts(): Observable<boolean> {
    return this.isLoadingPosts$;
  }

  loadPosts(): void {
    this.isLoadingPosts$.next(true);
    if (this.nextWeekToLoad === 999) {
      console.log('Loading current week');
      this.loadPostsByWeek(this.nextWeekToLoad).subscribe((data: Post[]) => {
        this.postsLoadedArray = data;
        this.posts$.next(this.postsLoadedArray);
        this.groupPostsByDay(this.postsLoadedArray);
        this.postsByDay$.next(this.postsLoadedByDayArray);
        this.nextWeekToLoad =
        this.utilsService.getWeekNumberFromDateRange('2022-01-01', data[0].dAdd) - 1;
        this.isLoadingPosts$.next(false);
      });
    } else if (this.nextWeekToLoad > 0) {
      console.log('Loading week', this.nextWeekToLoad);
      this.loadPostsByWeek(this.nextWeekToLoad).subscribe((data: Post[]) => {
        this.postsLoadedArray.push(...data);
        this.posts$.next(this.postsLoadedArray);
        this.groupPostsByDay(this.postsLoadedArray);
        this.postsByDay$.next(this.postsLoadedByDayArray);
        this.nextWeekToLoad = this.nextWeekToLoad - 1;
        this.isLoadingPosts$.next(false);
        // return this.posts$;
      });
    } else {
      console.log('No more posts.');
      this.isLoadingPosts$.next(false);
    }
  }

  loadPostsByWeek(week: number): Observable<Post[]> {
    const ref = doc(
      this.firestore,
      'postsByWeek',
      this.utilsService.numberToPaddedString(week)
    );
    const postData$ = docData(ref).pipe(map((data) => data?.['posts']));
    return postData$;
  }

  groupPostsByDay(posts: Post[]) {
    of(posts)
      .pipe(
        mergeMap((data: any) => from(data)),
        groupBy((post: any) => post.dAdd),
        mergeMap((group: any) => zip(of(group.key), group.pipe(toArray()))),
        map((res: any) => ({
          date: res[0],
          dailyPosts: res[1],
        })),
        toArray()
      )
      .subscribe((val) => {
        this.postsLoadedByDayArray = val;
        this.postsByDay$.next(this.postsLoadedByDayArray);
      });
  }

  groupBy(arrayObjects: any[], key: string | number) {
    return arrayObjects.reduce(function (result, currentObject) {
      const val = currentObject[key];
      result[val] = result[val] || [];
      result[val].push(currentObject);
      return result;
    }, {});
  }
}
