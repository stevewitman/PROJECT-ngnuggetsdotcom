import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminConstantsService {
  postTypes = [
    { value: 'blog' },
    { value: 'video' },
    { value: 'podcast' },
    { value: 'community' },
    { value: 'release' },
  ];

  urlMatches = [
    // *****  VIDEOS  *****
    {
      matchSubstring: 'https://www.youtube.com/watch?',
      postFormPatch: {
        type: 'video',
        sourceSite: 'YouTube',
        sourceUrl: 'https://youtube.com',
      },
    },
    {
      matchSubstring: 'https://youtu.be',
      postFormPatch: {
        type: 'video',
        sourceSite: 'YouTube',
        sourceUrl: 'https://youtube.com',
      },
    },
    // *****  BLOGS  *****
    {
      matchSubstring: 'https://dev.to/',
      postFormPatch: {
        type: 'blog',
        sourceSite: 'DEV Community',
        sourceUrl: 'https://dev.to',
      },
    },
    {
      matchSubstring: 'medium.com/',
      postFormPatch: {
        type: 'blog',
        sourceSite: 'Medium',
        sourceUrl: 'https://medium.com',
      },
    },
    {
      matchSubstring: 'hashnode.dev/',
      postFormPatch: {
        type: 'blog',
        sourceSite: 'Hashnode',
        sourceUrl: 'https://hashnode.com',
      },
    },
    {
      matchSubstring: 'https://blog.angular.io',
      postFormPatch: {
        type: 'blog',
        sourceSite: 'Angular Blog',
        sourceUrl: 'https://blog.angular.io',
      },
    },
    {
      matchSubstring: 'https://www.telerik.com/blogs',
      postFormPatch: {
        type: 'blog',
        sourceSite: 'Telerik Blogs',
        sourceUrl: 'https://www.telerik.com/blogs',
      },
    },
    // *****  PODCASTS  *****
    {
      matchSubstring: 'https://topenddevs.com/',
      postFormPatch: {
        type: 'podcast',
        sourceSite: 'Adventures in Angular',
        sourceUrl: 'https://topenddevs.com/',
      },
    },
    {
      matchSubstring: 'https://www.spreaker.com/user/ng-conf',
      postFormPatch: {
        type: 'podcast',
        sourceSite: 'The Angular Show',
        sourceUrl: 'https://www.spreaker.com/show/angular-show',
      },
    },
    {
      matchSubstring: 'https://www.spreaker.com/user/14532324/',
      postFormPatch: {
        type: 'podcast',
        sourceSite: 'Angular Experience',
        sourceUrl: 'https://angular-experience.web.app/episodes',
      },
    },
    {
      matchSubstring: 'https://open.spotify.com',
      postFormPatch: {
        type: 'podcast',
        sourceSite: 'Angular Master Podcast',
        sourceUrl: 'https://open.spotify.com/show/1wgZAEEIoRZ8eP78LTbyZf',
      },
    },
    {
      matchSubstring: 'https://webrush.io/episodes/',
      postFormPatch: {
        type: 'podcast',
        sourceSite: 'WebRush',
        sourceUrl: 'https://webrush.io',
      },
    },
    // *****  RELEASES  *****
    {
      matchSubstring: 'https://github.com/angular/angular/releases',
      postFormPatch: {
        type: 'release',
        sourceSite: 'GitHub Angular Releases',
        sourceUrl: 'https://github.com/angular/angular/releases',
      },
    },
  ];

  authorMatches = [
    {
      authorName: 'Steve Witman',
      sites: [
        {
          sourceSite: 'YouTube',
          postFormPatch: {
            authorUrl: 'a-YOUTUBE-url-for-STEVE',
            speakers: ['Steve Witman'],
          },
        },
        {
          sourceSite: 'Medium',
          postFormPatch: {
            authorUrl: 'a-MEDIUM-url-for-STEVE',
            speakers: ['Steve Witman'],
          },
        },
      ],
    },
    {
      authorName: 'JoeCoder',
      sites: [
        {
          sourceSite: 'YouTube',
          postFormPatch: {
            authorUrl: 'a-YOUTUBE-url-for-JoeCoder',
            speakers: ['Joe Coder'],
          },
        },
      ],
    },
    {
      authorName: 'halfStack',
      sites: [
        {
          sourceSite: 'YouTube',
          postFormPatch: {
            authorUrl: 'a-YOUTUBE-url-for-halfStack',
          },
        },
      ],
    },
  ];

  // postsByAuthor (document for each author)
  authorPosts = [
    {
      slug: '2022-02-01-L',
      type: 'blog',
      title: 'Setting Page Titles Natively With The Angular Router',
      url: 'https://dev.to/brandontroberts/setting-page-titles-natively-with-the-angular-router-393j',
      description:
        "When building applications with Angular, one common thing you should do is have the page title update after each successful navigation. This helps with accessibility and improves the navigation experience. This is something you've had to do manually in the past, but a recent feature added to the Angular Router coming in version 14 handles this natively, while allowing you to customize its behavior. This post shows you how to use the Angular Router's new built-in feature to for setting the page title after each successful navigation.",
      datePosted: '2022-02-01',
      dateSource: '2022-02-01',
      sourceSite: 'DEV Community',
      sourceUrl: 'https://dev.to',
      authorName: 'Brandon Roberts',
      authorUrl: 'https://dev.to/brandontroberts',
      speakers: ['Brandon Roberts'],
      tags: ['Routing'],
    },
    {
      slug: '2022-02-04-G',
      type: 'video',
      duration: '62',
      title: 'Open Source and Chill: Remix and Angular together?',
      url: 'https://youtu.be/Jj0rqeOqhh8?t=321',
      description: '',
      datePosted: '2022-02-04',
      dateSource: '2022-02-04',
      sourceSite: 'YouTube',
      sourceUrl: 'https://www.youtube.com/results?search_query=angular',
      authorName: 'Brandon Roberts',
      authorUrl: 'https://www.youtube.com/c/BrandonRobertsDev/videos',
      speakers: ['Brandon Roberts'],
      tags: [],
    },
  ];
}
