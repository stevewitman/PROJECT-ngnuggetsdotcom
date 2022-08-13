import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { concatMap, of, Subscription } from 'rxjs';

import { AdminConstantsService } from '../../services/admin-constants.service';
import { AdminUtilsService } from '../../services/admin-utils.service';
import { PostFomGroup } from 'src/app/core/models/postFormGroup';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit, OnDestroy {
  SubTypeValueChanges: Subscription | undefined;
  SubUrlValueChanges: Subscription | undefined;

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
    this.watchUrlChanges();
    this.watchTypeChanges();
  }

  ngOnDestroy() {
    this.SubUrlValueChanges?.unsubscribe();
    this.SubTypeValueChanges?.unsubscribe();
  }

  // Patch "type", "sourceSite", and "sourceUrl" form controls on
  // matching "url" substring match
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

  // ENABLE "duration" control and add REQUIRED validator if post "type"
  // control is VIDEO or PODCAST.
  // Otherwise DISABLE "duration" control and remove REQUIRED validator
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
}
