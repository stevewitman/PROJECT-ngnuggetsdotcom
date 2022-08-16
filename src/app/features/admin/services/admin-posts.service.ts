import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminPostsService {

  constructor(private http: HttpClient) {}

  recentPosts(): any {
    return this.http.get(`assets/json/samplePosts.json`);
  }
}
