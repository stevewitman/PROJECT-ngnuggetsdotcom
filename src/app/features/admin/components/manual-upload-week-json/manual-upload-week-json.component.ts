import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'app-manual-upload-week-json',
  templateUrl: './manual-upload-week-json.component.html',
  styleUrls: ['./manual-upload-week-json.component.scss'],
})
export class ManualUploadWeekJsonComponent implements OnInit, OnDestroy {
  subscriptions?: Subscription;

  constructor(private http: HttpClient, private firestore: Firestore) {}

  // week = '999';
  week = '053';
  posts: any;
  errorMessage = '';
  postsFromFirestore: any;

  ngOnInit(): void {
    this.getPostsFromJson(this.week);
  }

  getPostsFromJson(week: string) {
    this.subscriptions?.add(
      this.http.get(`assets/json/${week}.json`).subscribe(
        (val) => {
          this.posts = val;
        },
        (err) => {
          this.errorMessage = err.message;
          console.log(err);
        }
      )
    );
  }

  getPostsFromFirestore() {
    const ref = doc(this.firestore, 'postsByWeek', this.week);
    return docData(ref);
  }

  overwritePostsByWeek() {
    // Backup existing doc to oldPostsByWeek
    // this.subscriptions?.add(
    //   this.getPostsFromFirestore().pipe(
    //     take(1)
    //   ).subscribe((res) => {
    //     console.log('RES:', res);
    //     if (res) {
    //       console.log(
    //         `week/${this.week} document already exists ... copying to oldPostsByWeek.`
    //       );
    //       console.log(res);
    //       const oldPostsRef = collection(this.firestore, 'oldPostsByWeek');
    //       addDoc(oldPostsRef, res);
    //     } else {
    //       console.log('No existing document exists');
    //     }
    //   })
    // );

    // OVERWRITE doc with new data
    console.log('OVERWRITING postsByWeek/' + this.week);
    const ref = doc(this.firestore, 'postsByWeek', this.week);
    return from(
      setDoc(ref, {
        posts: this.posts,
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }
}
