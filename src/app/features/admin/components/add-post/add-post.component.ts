import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription, Observable, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { AdminConstantsService } from '../../services/admin-constants.service';
import { AdminUtilsService } from '../../services/admin-utils.service';
import { PostFomGroup } from 'src/app/core/models/postFormGroup';
import { AdminPostsService } from '../../services/admin-posts.service';
import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit, OnDestroy {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  recentPosts$: Observable<Post[]> = of([]);
  SubRecentPosts: Subscription | undefined;
  SubUrlValueChanges: Subscription | undefined;
  SubTypeValueChanges: Subscription | undefined;
  SubAuthorNameValueChanges: Subscription | undefined;
  srcDateOffset = 0;
  addSpeakerOnBlur = true;
  speakerChips: string[] = [];

  postForm = new FormGroup<PostFomGroup>({
    slug: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    url: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    duration: new FormControl<string | null>('', {}),
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', { nonNullable: true }),
    datePosted: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dateSource: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    sourceSite: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    sourceUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    authorName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    authorUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    speakers: new FormControl<string[]>([], { nonNullable: true }),
    tags: new FormControl<string[]>([], { nonNullable: true }),
  });

  constructor(
    public constants: AdminConstantsService,
    private utils: AdminUtilsService,
    private adminPostsService: AdminPostsService
  ) {}

  ngOnInit() {
    this.getRecentPosts();
    this.postForm.controls.duration.disable();
    this.initializeDates();
    this.watchUrlChanges();
    this.watchTypeChanges();
    this.watchAuthorNameChanges();
  }

  ngOnDestroy() {
    this.SubRecentPosts?.unsubscribe();
    this.SubUrlValueChanges?.unsubscribe();
    this.SubTypeValueChanges?.unsubscribe();
    this.SubAuthorNameValueChanges?.unsubscribe();
  }

  getRecentPosts() {
    this.recentPosts$ = this.adminPostsService.recentPosts();
  }

  /**
   * Watches 'url' ctrl and patches 'type', 'sourceSite', & 'sourceUrl' values
   * mapping for url to patch values imported from AdminConstantsService
   *
   * @param
   * @returns
   */
  watchUrlChanges() {
    this.SubUrlValueChanges = this.postForm.controls.url.valueChanges
      .pipe(
        concatMap((v) => {
          this.constants.urlMatches.forEach((element) => {
            if (this.utils.urlContains(v, element.matchSubstring)) {
              this.postForm.patchValue(element.postFormPatch);
              return of(true); // return value not used for anything
            } else {
              return of(false); // return value not used for anything
            }
          });
          return of(false); // return value not used for anything
        })
      )
      .subscribe();
  }

  /**
   * Watches 'type' ctrl and updates 'duration' ctrl disabled & validation states.
   * (video & podcast need 'duration', blog, release & community do not)
   *
   * @param
   * @returns
   */
  watchTypeChanges() {
    this.SubTypeValueChanges = this.postForm.controls.type.valueChanges
      .pipe(
        concatMap((v) => {
          if (v === 'video' || v === 'podcast') {
            this.postForm.controls.duration.enable();
            this.postForm.controls.duration.setValidators([
              Validators.required,
            ]);
            return of(true); // return value not used for anything
          } else {
            this.postForm.controls.duration.disable();
            this.postForm.controls.duration.setValidators(null);
            return of(false); // return value not used for anything
          }
        })
      )
      .subscribe();
  }

  /**
   * Watches 'authorName' ctrl and updates 'authorUrl' ctrl and 'speakers'
   * from retrieved posts if exists.
   *
   * @param
   * @returns
   */
  watchAuthorNameChanges() {
    this.SubAuthorNameValueChanges =
      this.postForm.controls.authorName.valueChanges
        .pipe(
          tap((res) => {
            this.SubRecentPosts = this.recentPosts$
              .pipe(
                map((posts) =>
                  posts.find(
                    (post) =>
                      res === post.authorName &&
                      this.postForm.controls.sourceSite.value ===
                        post.sourceSite
                  )
                ),
                tap((res) => {
                  this.postForm.patchValue({
                    authorUrl: res?.authorUrl,
                    speakers: res?.speakers,
                  });
                  if (res?.speakers) {
                    this.speakerChips.push(res?.speakers[0]);
                  }
                })
              )
              .subscribe();
          })
        )
        .subscribe();
  }

  /**
   * Initialize datePosted and dateSource with today's date
   * @param
   * @returns
   */
  initializeDates() {
    this.postForm.patchValue({
      datePosted: this.utils.todayDateString(),
      dateSource: this.utils.todayDateString(),
    });
  }

  /**
   * Adds speaker to speakerChips array that displays chips
   * and also patches speakers with new speakerChips array
   * @param {string} speaker - string to be added to speakerChips array
   * @returns
   */
  addSpeaker(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add speaker
    if (value) {
      this.speakerChips.push(value);
      this.postForm.patchValue({ speakers: this.speakerChips });
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  /**
   * Remove speaker from speakerChips array that displays chips
   * and also patches speakers with new speakerChips array
   * @param {string} speaker - string to be removed from speakerChips array
   * @returns
   */
  removeSpeaker(speaker: string): void {
    const index = this.speakerChips.indexOf(speaker);
    // Remove speaker
    if (index >= 0) {
      this.speakerChips.splice(index, 1);
      this.postForm.patchValue({ speakers: this.speakerChips });
    }
  }

  /**
   * Changes srcDateOffset from increment or decrement button clicks and
   * patches dateSource, if needed. dateSource cannot be past todays date.
   *
   * @param {number} x - one or minus one
   * @returns
   */
  adjSrcDate(x: number) {
    this.srcDateOffset = this.srcDateOffset + x;
    if (this.srcDateOffset <= 0) {
      let newDate = this.utils.dateStringFromOffset(this.srcDateOffset);
      this.postForm.patchValue({
        dateSource: newDate,
      });
    } else {
      this.srcDateOffset = 0;
    }
  }
}
