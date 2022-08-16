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
        sourceSite: 'DevChat.tv',
        sourceUrl: 'https://adventuresinangular.com',
        authorName: 'Adventures In Angular',
        authorUrl: 'https://topenddevs.com/podcasts/adventures-in-angular/',
      },
    },
    {
      matchSubstring: 'https://www.spreaker.com/user/ng-conf',
      postFormPatch: {
        type: 'podcast',
        sourceSite: 'Spreaker',
        sourceUrl: 'https://www.spreaker.com',
        authorName: 'The Angular Plus Show',
        authorUrl: 'https://www.spreaker.com/show/angular-show',
      },
    },
    {
      matchSubstring: 'https://www.spreaker.com/user/14532324/',
      postFormPatch: {
        type: 'podcast',
        sourceSite: 'Spreaker',
        sourceUrl: 'https://spreaker.com',
        authorName: 'Angular Experience',
        authorUrl: 'https://angular-experience.web.app/episodes',
      },
    },
    {
      matchSubstring: 'https://open.spotify.com',
      postFormPatch: {
        type: 'podcast',
        sourceSite: 'Spotify',
        sourceUrl: 'https://open.spotify.com',
        authorName: 'Angular Master Podcast',
        authorUrl: 'https://open.spotify.com/show/1wgZAEEIoRZ8eP78LTbyZf',
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

}
