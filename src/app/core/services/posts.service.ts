import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Firestore } from '@angular/fire/firestore';

import { Post } from '../models/post';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private firestore: Firestore,
    private http: HttpClient) {
    // this.addPosts(posts2);
  }

  // loadPostsByWeek(week: string): Post[] {
  loadPostsByWeek(week: string): any {
  //   const posts$ = this.http.get<Post[]>(`assets/json/${week}.json`);
  //   posts$.subscribe((data) => {
  //     console.log('isArray?', data);
  //   });
    // console.log('isArray?', posts.isArray());

    return this.http.get<Post[]>(`assets/json/${week}.json`);
  }

  async getTodaysPosts() {
    // const userRef = doc(this.firestore, `posts/${posts.date}`);
  }

  async addPosts(posts: any) {
    // const userRef = doc(this.firestore, `posts/${posts.date}`);
    // return await setDoc(userRef, posts, { merge: true });
  }

  // load posts-wk999
  // find previous week from todays date
  // load latest posts-wk025
  // load authorName (authorU)
  //
}
