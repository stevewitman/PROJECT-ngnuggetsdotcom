import { Component, OnInit } from '@angular/core';

import { Observable, of, take } from 'rxjs';

import { DailyPost, Post } from 'src/app/core/models/post';
import { PostsService } from 'src/app/core/services/posts.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
  animations: [Animations.routeAnimations],
})
export class PostsPageComponent implements OnInit {
  disableLoadButton$ = of(false);
  postsByDay$: Observable<DailyPost[]> = of([]);

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.loadPosts();
    this.postsByDay$ = this.postsService.getPostsByDay();
    this.disableLoadButton$ = this.postsService.getdisableLoadButton();
  }

  loadAnotherWeek() {
    this.postsService.loadPosts();
  }
}
