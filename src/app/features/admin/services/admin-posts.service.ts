import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { from, map, tap, Observable } from 'rxjs';
import { Firestore, collection, doc, docData, addDoc, updateDoc, setDoc } from '@angular/fire/firestore';

import { Post } from 'src/app/core/models/post';

@Injectable({
  providedIn: 'root',
})
export class AdminPostsService {
  constructor (
    private http: HttpClient,
    private firestore: Firestore
  ) {}

  getTodaysPosts(date: string): Observable<Post[]> {
    const ref = doc(
      this.firestore,
      'postsByDay',
      date
    );
    const postData$ = docData(ref).pipe(
      map((data) => data?.['posts']
      ));
    return postData$;
      
  }

  getRecentPosts(): any {
    return this.http.get(`assets/json/current.json`);
  }

  getPostsByWeek(week: string): any {
    const ref = doc(this.firestore, `postsByWeek/${week}`);
    return docData(ref);
  }

  // publishPosts() {
  // }

  getTemp() {
    // get 2022-08-13.json from assets
    return this.http.get('assets/json/2022-08-13.json');
    // const postDoc = doc(this.firestore, 'posts/2022-08-13');
    // return docData(postDoc);
  }

  overwritePostsByWeek(week: string, posts: any) {
    // save 2022-08-13.json to firestore
    const docRef = doc(this.firestore, 'postsByWeek', week);
    // console.log('docRef', docRef.toString());
    return from(setDoc(docRef, { posts: posts }));
  }

  getPostsStaged() {
    // get 2022-08-13.json from assets
    // return this.http.get('assets/json/2022-08-13.json');
    const postDoc = doc(this.firestore, 'postsStaged');
    return docData(postDoc);
  }

  stagePost(data: any) {
    const docRef = doc(this.firestore, 'posts', 'staged');
    return setDoc(docRef, { stagedPost: data });
  }

  // MANUAL FUNCTIONS
}
