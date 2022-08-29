import { Injectable } from '@angular/core';

import { Firestore, doc, docData } from '@angular/fire/firestore';
import {
  Observable,
  of,
  from,
  map,
  mergeMap,
  groupBy,
  zip,
  toArray,
  tap,
} from 'rxjs';

import { Post } from '../models/post';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private firestore: Firestore
  ) {}

  loadPostsByWeek(week: string): Observable<Post[]> {
    const ref = doc(this.firestore, 'postsByWeek', week);
    const postData$ = docData(ref).pipe(map((data) => data?.['posts']));
    return postData$;
  }

  groupPostsByDay(posts$: Observable<Post[]>) { 
    return posts$.pipe(
      mergeMap((data: any) => from(data)),
      groupBy((post: any) => post.dAdd),
      mergeMap((group: any) => zip(of(group.key), group.pipe(toArray()))),
      map((res: any) => ({
        date: res[0],
        dailyPosts: res[1],
      })),
      toArray()
    );
  }

}
