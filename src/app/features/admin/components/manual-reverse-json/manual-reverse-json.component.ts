import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual-reverse-json',
  templateUrl: './manual-reverse-json.component.html',
  styleUrls: ['./manual-reverse-json.component.scss'],
})
export class ManualReverseJsonComponent implements OnInit {

  constructor(private http: HttpClient) {}

  week = '035';
  posts: any;
  postsReversed: any;
  error = false;
  errorMessage = '';

  ngOnInit(): void {
    this.getPostsFromJson(this.week);
  }

  getPostsFromJson(week: string) {
    this.http.get(`assets/json/${week}.json`).subscribe(
      (val) => {
        this.posts = val;
        this.posts.reverse();
        console.log(this.posts);

      },
      (err) => {
        this.errorMessage = err.message;
        console.log(err);
      }
    );
  }
}
