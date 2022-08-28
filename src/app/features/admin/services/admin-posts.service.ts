import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Firestore, collection, doc, docData, addDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPostsService {
  constructor(private http: HttpClient, private afs: Firestore) {}

  recentPosts(): any {
    return this.http.get(`assets/json/current.json`);
  }

  getPostsByWeek(week: string): any {
    const ref = doc(this.afs, `postsByWeek/${week}`);
    return docData(ref);
  }

  // publishPosts() {
  // }

  getTemp() {
    // get 2022-08-13.json from assets
    return this.http.get('assets/json/2022-08-13.json');
    // const postDoc = doc(this.afs, 'posts/2022-08-13');
    // return docData(postDoc);
  }

  overwritePostsByWeek(week: string, posts: any) {
    // save 2022-08-13.json to firestore
    const docRef = doc(this.afs, 'postsByWeek', week);
    // console.log('docRef', docRef.toString());
    return from(setDoc(docRef, { posts: posts }));
  }

  getPostsStaged() {
    // get 2022-08-13.json from assets
    // return this.http.get('assets/json/2022-08-13.json');
    const postDoc = doc(this.afs, 'postsStaged');
    return docData(postDoc);
  }

  stagePost(data: any) {
    const docRef = doc(this.afs, 'posts', 'staged');
    return setDoc(docRef, { stagedPost: data });
  }

  // MANUAL FUNCTIONS
  
}
