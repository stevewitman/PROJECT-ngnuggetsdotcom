import { V } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { concatMap, from, groupBy, map, mergeAll, mergeMap, of, reduce, tap, toArray, zip } from 'rxjs';
import { Post } from 'src/app/core/models/post';

import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent implements OnInit {
  
  postsAll$: any;
  postsByDay$: any;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsAll$ = this.postsService.loadPostsByWeek('999');

    this.postsByDay$ = this.postsAll$
      .pipe(
        mergeMap((data: any) => from(data)),
        groupBy((post: any) => post.dAdd),
        // mergeMap((group: any) => group.pipe(toArray())),
        mergeMap((group: any) => zip(of(group.key), group.pipe(toArray()))),
        map((res: any) => ({
          'date': res[0],
          'dailyPosts': res[1]
        })),
        toArray()
        // mergeAll()
        // tap(console.log)
      )
      // .subscribe(console.log);

  }
}
  // {
    // "date": "2022-08-20",
    // "dailyPosts": [