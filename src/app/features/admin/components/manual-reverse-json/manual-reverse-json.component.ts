import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manual-reverse-json',
  templateUrl: './manual-reverse-json.component.html',
  styleUrls: ['./manual-reverse-json.component.scss'],
})
export class ManualReverseJsonComponent implements OnInit, OnDestroy {
  subscriptions?: Subscription;

  constructor(private http: HttpClient) {}

  week = 'temp';
  posts: any;
  postsReversed: any;
  error = false;
  errorMessage = '';

  ngOnInit(): void {
    this.getPostsFromJson(this.week);
  }

  getPostsFromJson(week: string) {
    const sub = this.http.get(`assets/json/${week}.json`).subscribe(
      (val) => {
        this.posts = val;
        this.posts.reverse();
        // console.log(this.posts);
      },
      (err) => {
        this.errorMessage = err.message;
        // console.log(err);
      }
    );
    this.subscriptions?.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }
}
