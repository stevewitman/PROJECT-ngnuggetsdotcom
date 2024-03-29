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
  Subscription,
} from 'rxjs';

import { DailyPost, Post } from '../models/post';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  subscriptions?: Subscription;
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

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

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
      console.log('Loading most recent');
      const sub = this.loadPostsByWeek(this.nextWeekToLoad).subscribe((data: Post[]) => {
        this.postsLoadedArray = data;
        this.posts$.next(this.postsLoadedArray);
        this.groupPostsByDay(this.postsLoadedArray);
        this.postsByDay$.next(this.postsLoadedByDayArray);
        this.nextWeekToLoad =
        this.utilsService.getWeekNumberFromDateRange('2022-01-01', data[0].dAdd) - 1;
        this.isLoadingPosts$.next(false);
      });
      this.subscriptions?.add(sub);
    } else if (this.nextWeekToLoad > 0) {
      console.log('Loading week', this.nextWeekToLoad);
      const sub = this.loadPostsByWeek(this.nextWeekToLoad).subscribe((data: Post[]) => {
        this.postsLoadedArray.push(...data);
        this.posts$.next(this.postsLoadedArray);
        this.groupPostsByDay(this.postsLoadedArray);
        this.postsByDay$.next(this.postsLoadedByDayArray);
        this.nextWeekToLoad = this.nextWeekToLoad - 1;
        this.isLoadingPosts$.next(false);
        // return this.posts$;
      });
      this.subscriptions?.add(sub);
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
    const sub = of(posts).pipe(
      mergeMap((data: any) => from(data)),
      groupBy((post: any) => post.dAdd),
      mergeMap((group: any) => zip(of(group.key), group.pipe(toArray()))),
      map((res: any) => ({
        date: res[0],
        dailyPosts: res[1],
      })),
      toArray()
    ).subscribe((val) => {
      this.postsLoadedByDayArray = val;
      this.postsByDay$.next(this.postsLoadedByDayArray);
    });
    this.subscriptions?.add(sub);
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
