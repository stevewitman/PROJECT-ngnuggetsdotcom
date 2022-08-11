import { Injectable } from '@angular/core';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';

let posts = {
  date: '2022-01-01',
  dailyPosts: [
    {
      slug: '2022-01-01-A',
      type: 'video',
      duration: '11',
      title:
        'Angular Unit testing 24 | Unit testing Form Control valueChanges Property Reactive Forms',
      url: 'https://www.youtube.com/watch?v=RGNdT3vb4kM',
      description:
        'In this video, you will learn How to test Angular valueChanges property of form control in reactive forms.',
      datePosted: '2022-01-01',
      dateSource: '2022-01-01',
      sourceSite: 'YouTube',
      sourceUrl: 'https://www.youtube.com/results?search_query=angular',
      authorName: 'TechshareSKK23',
      authorUrl:
        'https://www.youtube.com/channel/UCD8gC85u512FeCFzRV4Ll-A/videos',
      speakers: ['Sai Kumar Korthivada'],
      tags: ['Testing', 'Forms', 'Reactive Forms', 'valueChanges'],
    },
    {
      slug: '2022-01-01-B',
      type: 'video',
      duration: '36',
      title: 'Angular Beginner to Advanced | Day 5 | WebAppUpgrade',
      url: 'https://www.youtube.com/watch?v=yXfAU3dGvaU',
      description:
        'In five days take your Angular skills to the next level, from beginners to Advanced.',
      datePosted: '2022-01-01',
      dateSource: '2021-12-31',
      sourceSite: 'YouTube',
      sourceUrl: 'https://www.youtube.com/results?search_query=angular',
      authorName: 'The Web Dev',
      authorUrl:
        'https://www.youtube.com/channel/UCRf7mazcufqZxd2pR3oQJuQ/videos',
      speakers: ['Nabendu Biswas'],
      tags: [],
    },
    {
      slug: '2022-01-01-C',
      type: 'blog',
      title: 'Creating custom pagination component with Angular',
      url: 'https://medium.com/@kirill.kovzel/creating-custom-pagination-component-with-angular-9c6c93fdf0f0',
      description:
        'Pagination is undoubtedly one of the most popular approaches to dozed ...',
      datePosted: '2022-01-01',
      dateSource: '2022-01-01',
      sourceSite: 'DEV Community',
      sourceUrl: 'https://dev.to',
      authorName: 'Kirill Kovzel',
      authorUrl: 'https://medium.com/@kirill.kovzel',
      speakers: ['Kirill Kovzel'],
      tags: ['Pagination', 'Custom'],
    },
  ],
}; 
let posts2 = {
  "date": "2022-01-02",
  "dailyPosts": [
    {
      "slug": "2022-01-02-A",
      "type": "blog",
      "title": "Built-In Angular Pipes - Part 1",
      "url": "https://dev.to/this-is-angular/built-in-angular-pipes-part-1-23ec",
      "description": "Today we will be learning on a very important concept provided by Angular - Pipes. The main use of Pipe is to transform the appearance of the data before showing to the user.",
      "datePosted": "2022-01-02",
      "dateSource": "2022-01-02",
      "sourceSite": "DEV Community",
      "sourceUrl": "https://dev.to",
      "authorName": "Anubhab Mukherjee",
      "authorUrl": "https://dev.to/anubhab5",
      "speakers": ["Anubhab Mukherjee"],
      "tags": ["Pipes"]
    },
    {
      "slug": "2022-01-02-B",
      "type": "video",
      "duration": "13",
      "title": "Angular 13 new features | Micro Front End is coming | Angular 14 updates",
      "url": "https://www.youtube.com/watch?v=FgItZM4yHvY",
      "description": "Angular 13 has been released. Let's have a look at the new in this Angular 13 tutorial. we'll learn what's the new feature of the Angular 13 version. We will also talk about the Angular 14 updates and big news about the Micro Font End in the Angular framework.",
      "datePosted": "2022-01-02",
      "dateSource": "2021-01-01",
      "sourceSite": "YouTube",
      "sourceUrl": "https://www.youtube.com/results?search_query=angular",
      "authorName": "codeWithAmi",
      "authorUrl": "https://www.youtube.com/c/codeWithAmi/videos",
      "speakers": [],
      "tags": []
    },
    {
      "slug": "2022-01-02-C",
      "type": "blog",
      "title": "Firebase Authentication - Getting started with Firebase Authentication using Angular code example",
      "url": "https://medium.com/@liatkomp/firebase-authentication-f0445ac732cb",
      "description": "Website application development brings us many challenges. One of them is users' identity. Using Firebase Authentication makes this mission simpler, saves us a significant amount of time, and speeds up code implementation. This post will cover Firebase Authentication — how, when, and why to use Firebase Authentication.",
      "datePosted": "2022-01-02",
      "dateSource": "2022-01-01",
      "sourceSite": "Medium",
      "sourceUrl": "https://medium.com",
      "authorName": "Liat Kompas",
      "authorUrl": "https://medium.com/@liatkomp",
      "speakers": ["Liat Kompas"],
      "tags": ["Firebase", "Auth"]
    },
    {
      "slug": "2022-01-02-D",
      "type": "video",
      "duration": "13",
      "title": "Angular Material Cards Tutorial",
      "url": "https://www.youtube.com/watch?v=R762IDrdxP0",
      "description": "In this Angular material tutorial you will learn How to use Angular Material Cards Tutorial",
      "datePosted": "2022-01-02",
      "dateSource": "2022-01-02",
      "sourceSite": "YouTube",
      "sourceUrl": "https://www.youtube.com/results?search_query=angular",
      "authorName": "AyyazTech",
      "authorUrl": "https://www.youtube.com/c/AyyazTech/videos",
      "speakers": ["Ayyaz Zafar"],
      "tags": ["Angular Material"]
    },
  ]
}
let posts3 = {
  date: '2022-01-03',
  dailyPosts: [
    {
      slug: '2022-01-03-A',
      type: 'blog',
      title: 'Key Strategies to Improve your Angular Codebase Instantly!',
      url: 'https://martha-7987.medium.com/key-strategies-to-improve-your-angular-codebase-instantly-5b8c4fa47cd3',
      description:
        'Utilizing the Angular framework for building an app is immensely beneficial. Nevertheless, coding in Angular can turn tricky at times, thereby adversely affecting the code quality. Thankfully, there are certain tried and tested strategies that will instantly improve the quality of your Angular codebase. This post provides Angular Development Company with detailed insights into these ingenious strategies. Take a look!',
      datePosted: '2022-01-03',
      dateSource: '2022-01-02',
      sourceSite: 'Medium',
      sourceUrl: 'https://medium.com',
      authorName: 'Martha Jones',
      authorUrl: 'https://martha-7987.medium.com',
      speakers: ['Martha Jones'],
      tags: [],
    },
    {
      slug: '2022-01-03-B',
      type: 'video',
      duration: '20',
      title: 'Angular - Feature Module',
      url: 'https://www.youtube.com/watch?v=MXYuPq8Vjms',
      description: '',
      datePosted: '2022-01-03',
      dateSource: '2022-01-02',
      sourceSite: 'YouTube',
      sourceUrl: 'https://www.youtube.com/results?search_query=angular',
      authorName: 'Krishna Chaitanya Tech Center',
      authorUrl:
        'https://www.youtube.com/channel/UC6hjO6A1FvKKfMlAA7EOJDA/videos',
      speakers: [],
      tags: ['Modules'],
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private firestore: Firestore) {
    // this.addPosts(posts2);
  }

  async getTodaysPosts() {
    const userRef = doc(this.firestore, `posts/${posts.date}`);
  }

  async addPosts(posts: any) {
    const userRef = doc(this.firestore, `posts/${posts.date}`);
    return await setDoc(userRef, posts, { merge: true });
  }

  // load posts-wk999 
  // find previous week from todays date
  // load latest posts-wk025
  // load authorName (authorU)
  // 

}
