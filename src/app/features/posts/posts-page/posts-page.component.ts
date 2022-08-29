import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Post } from 'src/app/core/models/post';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent implements OnInit {

  currentWeek = '035'
  postsAll$: Observable<Post[]> = of([]);
  postsByDay$: any;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsAll$ = this.getPostsByWeek(this.currentWeek);
    this.postsAll$.subscribe({
      next:(res) => {
        this.postsByDay$ = this.groupPostsByDay(of(res));
      },
      error:(err) => {console.error(err)},
      complete:() => {console.log('observable complete')}
    });
  }

  getPostsByWeek(week: string): Observable<Post[]> {
    return this.postsService.loadPostsByWeek(week);
  }

  groupPostsByDay(posts$: Observable<Post[]>) {
    return this.postsService.groupPostsByDay(posts$);
  }

}
