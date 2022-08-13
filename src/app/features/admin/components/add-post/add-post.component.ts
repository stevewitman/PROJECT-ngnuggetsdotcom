import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { concatMap, fromEvent, of, Subscription, merge, startWith, Observable, scan, tap } from 'rxjs';

import { AdminConstantsService } from '../../services/admin-constants.service';
import { AdminUtilsService } from '../../services/admin-utils.service';
import { PostFomGroup } from 'src/app/core/models/postFormGroup';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit, OnDestroy {
  todaysDate: Date = new Date();
  SubTypeValueChanges: Subscription | undefined;
  SubUrlValueChanges: Subscription | undefined;

  srcDateOffset = 0;

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
    private utils: AdminUtilsService
  ) {}

  ngOnInit() {
    this.postForm.controls.duration.disable();
    this.initializeDates();
    this.watchUrlChanges();
    this.watchTypeChanges();
  }

  ngOnDestroy() {
    this.SubUrlValueChanges?.unsubscribe();
    this.SubTypeValueChanges?.unsubscribe();
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

  adjSrcDate(x: number) {
    this.srcDateOffset = this.srcDateOffset + x;
    if (this.srcDateOffset <= 0) {
      let newDate = this.utils.dateStringFromOffset(this.srcDateOffset);
      this.postForm.patchValue({
        dateSource: newDate,
      });
    } else {
      this.srcDateOffset = 0
    }    
  }

  initializeDates() {
    this.postForm.patchValue({
      datePosted: this.utils.todayDateString(),
      dateSource: this.utils.todayDateString(),
    });
  }

  changeSourceDate(x: number) {
    // srcDate = this.postForm.console.log('sourceDate ', x);
  }
}


