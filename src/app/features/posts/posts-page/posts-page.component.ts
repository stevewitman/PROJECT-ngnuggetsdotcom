import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { Observable, of, Subscription } from 'rxjs';

import { DailyPost } from 'src/app/core/models/post';
import { PostsService } from 'src/app/core/services/posts.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
  animations: [Animations.routeAnimations],
})
export class PostsPageComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions?: Subscription;
  @ViewChildren('loadMorePosts', { read: ElementRef })
  loadMorePosts!: QueryList<ElementRef>;

  isLoadingPosts$ = of(false);
  postsByDay$: Observable<DailyPost[]> = of([]);
  observer: any;
  isLoadingMorePosts = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.loadPosts();
    this.postsByDay$ = this.postsService.getPostsByDay();
    this.isLoadingPosts$ = this.postsService.getIsLoadingPosts();
    this.intersectionObserver();
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subscriptions?.add(
      this.loadMorePosts.changes.subscribe((d) => {
        if (d.last) {
          this.observer.observe(d.last.nativeElement);
        }
      })
    );
  }

  intersectionObserver() {
    const intersectionObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.postsService.loadPosts();
      }
    });
  }
}
