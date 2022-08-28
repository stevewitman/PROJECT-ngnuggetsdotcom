import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription, Observable, of } from 'rxjs';
import { concatMap, map, tap, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { AdminConstantsService } from '../../services/admin-constants.service';
import { AdminUtilsService } from '../../services/admin-utils.service';
import { PostFomGroup } from 'src/app/core/models/postFormGroup';
import { AdminPostsService } from '../../services/admin-posts.service';
import { Post } from 'src/app/core/models/post';
import { UtilsService } from 'src/app/core/services/utils.service';

export interface PostsData {
  posts: string;
}
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
  tagsCtrl = new FormControl('');
  filteredTags!: Observable<string[]>;
  selectedTags: string[] = [];
  allTags: string[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> =
    {} as ElementRef;

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
    dur: new FormControl<string | null>('', {}),
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    desc: new FormControl<string>('', { nonNullable: true }),
    dAdd: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dSrc: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    srcSite: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    srcUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    aName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    aUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    spkrs: new FormControl<string[]>([], { nonNullable: true }),
    tags: new FormControl<string[]>([], { nonNullable: true }),
  });

  constructor(
    public constants: AdminConstantsService,
    private utils: UtilsService,
    private adminUtils: AdminUtilsService,
    private adminPostsService: AdminPostsService
  ) {}

  ngOnInit() {
    this.getRecentPosts();
    this.postForm.controls.dur.disable();
    this.initializeDates();
    this.watchUrlChanges();
    this.watchTypeChanges();
    this.watchAuthorNameChanges();
    this.allTags = this.constants.allTags;
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._tagFilter(tag) : this.allTags.slice()
      )
    );
    console.log(
      'WEEK',
      this.utils.getWeekNumberFromDateRange('2022-01-01', '2022-08-20')
    );
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
   * Watches 'url' ctrl and patches 'type', 'srcSite', & 'sourceUrl' values
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
            if (this.adminUtils.urlContains(v, element.matchSubstring)) {
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
   * Watches 'type' ctrl and updates 'dur' ctrl disabled & validation states.
   * (video & podcast need 'dur', blog, release & community do not)
   *
   * @param
   * @returns
   */
  watchTypeChanges() {
    this.SubTypeValueChanges = this.postForm.controls.type.valueChanges
      .pipe(
        concatMap((v) => {
          if (v === 'video' || v === 'podcast') {
            this.postForm.controls.dur.enable();
            this.postForm.controls.dur.setValidators([
              Validators.required,
            ]);
            return of(true); // return value not used for anything
          } else {
            this.postForm.controls.dur.disable();
            this.postForm.controls.dur.setValidators(null);
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
    this.SubAuthorNameValueChanges = this.postForm.controls.aName.valueChanges
      .pipe(
        tap((res) => {
          this.SubRecentPosts = this.recentPosts$
            .pipe(
              map((posts) =>
                posts.find(
                  (post) =>
                    res === post.aName &&
                    this.postForm.controls.srcSite.value === post.srcSite
                )
              ),
              tap((res) => {
                this.postForm.patchValue({
                  aUrl: res?.aUrl,
                  spkrs: res?.spkrs,
                });
                if (res?.spkrs) {
                  this.speakerChips.push(res?.spkrs[0]);
                }
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  /**
   * Initialize dAdd and dSrc with today's date
   * @param
   * @returns
   */
  initializeDates() {
    this.postForm.patchValue({
      dAdd: this.utils.todayDateString(),
      dSrc: this.utils.todayDateString(),
    });
  }

  /**
   * Adds speaker to speakerChips array that displays chips
   * and also patches spkrs with new speakerChips array
   * @param {string} speaker - string to be added to speakerChips array
   * @returns
   */
  addSpeaker(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add speaker
    if (value) {
      this.speakerChips.push(value);
      this.postForm.patchValue({ spkrs: this.speakerChips });
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  /**
   * Remove speaker from speakerChips array that displays chips
   * and also patches spkrs with new speakerChips array
   * @param {string} speaker - string to be removed from speakerChips array
   * @returns
   */
  removeSpeaker(speaker: string): void {
    const index = this.speakerChips.indexOf(speaker);
    // Remove speaker
    if (index >= 0) {
      this.speakerChips.splice(index, 1);
      this.postForm.patchValue({ spkrs: this.speakerChips });
    }
  }

  /**
   * Adds tag to selectedTags array that displays chips
   * and also patches tags with new selectedTags array
   * @param {string} tag - string to be added to selectedTags array
   * @returns
   */
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add tag
    if (value) {
      this.selectedTags.push(value);
      // TODO - add new tags to tags list
      if (!this.allTags.includes(value)) {
        console.error('Tag not recognized!');
      }
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagsCtrl.setValue(null);
  }

  /**
   * Remove tag from selectedTags array that displays chips
   * and also patches tags with new selectedTags array
   * @param {string} tag - string to be removed from selectedTags array
   * @returns
   */
  removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    // Remove tag
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      this.postForm.patchValue({ tags: this.selectedTags });
    }
  }

  tagSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.postForm.patchValue({ tags: this.selectedTags });
    this.tagsCtrl.setValue(null);
  }

  /**
   * Changes srcDateOffset from increment or decrement button clicks and
   * patches dSrc, if needed. dSrc cannot be past todays date.
   *
   * @param {number} x - one or minus one
   * @returns
   */
  adjSrcDate(x: number) {
    this.srcDateOffset = this.srcDateOffset + x;
    if (this.srcDateOffset <= 0) {
      let newDate = this.adminUtils.dateStringFromOffset(this.srcDateOffset);
      this.postForm.patchValue({
        dSrc: newDate,
      });
    } else {
      this.srcDateOffset = 0;
    }
  }

  private _tagFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }
}
