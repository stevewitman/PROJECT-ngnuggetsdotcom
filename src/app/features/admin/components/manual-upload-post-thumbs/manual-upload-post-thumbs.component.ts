import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  getDownloadURL,
  Storage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { from, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-manual-upload-post-thumbs',
  templateUrl: './manual-upload-post-thumbs.component.html',
  styleUrls: ['./manual-upload-post-thumbs.component.scss'],
})
export class ManualUploadPostThumbsComponent implements OnInit {
  selectedFile = null;

  constructor(private http: HttpClient, private storage: Storage) {}

  week = '038';
  posts: any;
  error = false;
  errorMessage = '';  

  ngOnInit(): void {
    this.getPostsFromJson('temp');
  }

  getPostsFromJson(week: string) {
    console.log(`Getting posts from assets/json/${week}.json`);
    this.http.get(`assets/json/${week}.json`).subscribe(
      (val) => {
        this.posts = val;
        console.log(this.posts);
      },
      (err) => {
        this.errorMessage = err.message;
        console.log(err);
      }
    );
  }

  uploadImage(event: any, index: number) {
    console.log(`Uploading image to thumbs/${this.week}/${this.posts[index].slug}`);

    this.error = false;
    let stripedFileName = event.target.files[0].name.replace('.jpg', '');
    if (stripedFileName === this.posts[index].slug) {
      this.SERVuploadImage(
        event.target.files[0],
        `thumbs/${this.week}/${this.posts[index].slug}`
      )
        .pipe(
          tap((imgUrl) => {
            this.posts[index]['imgUrl'] = imgUrl;
            console.log('New Image URL:', imgUrl);
          })
        )
        .subscribe();
    } else {
      this.error = true;
    }
  }

  SERVuploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    console.log('SERVuploadImage', storageRef);
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
