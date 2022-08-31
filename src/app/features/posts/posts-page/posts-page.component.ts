import { Component, OnInit } from '@angular/core';

import { Observable, of, take } from 'rxjs';

import { DailyPost, Post } from 'src/app/core/models/post';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent implements OnInit {
  disableLoadButton$ = of(false);

  // posts$: Observable<Post[]> = of([]);
  postsByDay$: Observable<DailyPost[]> = of([]);

  constructor(
    private postsService: PostsService,
  ) {}

  ngOnInit(): void {
    this.postsService.loadPosts();
    // this.posts$ = this.postsService.getPosts();
    this.postsByDay$ = this.postsService.getPostsByDay()
    this.disableLoadButton$ = this.postsService.getdisableLoadButton();
  }

  loadAnotherWeek() {
    this.postsService.loadPosts();
  }

}
