import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {
  Firestore,
  collection,
  doc,
  docData,
  addDoc,
  updateDoc,
  setDoc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  Storage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { from, Observable, switchMap, concatMap, tap } from 'rxjs';



@Component({
  selector: 'app-migration',
  templateUrl: './migration.component.html',
  styleUrls: ['./migration.component.scss'],
})
export class MigrationComponent implements OnInit {
  selectedFile = null;

  constructor(private http: HttpClient, private storage: Storage) {}
  error = false;

  week = '017';
  posts: any;
  postsFinal = [];
  postsReversed: any;

  ngOnInit(): void {
    this.getPostsFromJson(this.week);
  }

  getPostsFromJson(week: string) {
    this.http.get(`assets/json/${week}.json`).subscribe((val) => {
      this.posts = val;
      console.log(this.posts);
      // this.postsReversed = this.posts.reverse(); // mutates??
      // console.log(this.postsReversed);
    });
  }

  uploadImage(event: any, index: number) {
    this.error = false;
    // let selectedFileName = event.target.files[0].name;
    let stripedFileName = event.target.files[0].name.replace('.jpg', '');
    console.log('stripedFileName:', stripedFileName);
    console.log('slug:', this.posts[index].slug);
    console.log('comparison:', stripedFileName === this.posts[index].slug);
    
    if (stripedFileName === this.posts[index].slug) {
      this.SERVuploadImage(
        event.target.files[0],
        `thumbs/${this.week}/${this.posts[index].slug}`
      )
        .pipe(
          tap(
            (imgUrl) => {
              this.posts[index]['imgUrl'] = imgUrl;
              console.log('New Image URL:', imgUrl);
            }
          )
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


  weekString(num: number) {
    let numString = num.toString();
    while (numString.length < 3) {
      numString = '0' + numString;
    }
    console.log('numString:', numString);

    return numString;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target!.files[0];
    console.log('EVENT:', event);
  }
}
