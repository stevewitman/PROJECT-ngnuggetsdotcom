import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { concatMap, of, Subscription } from 'rxjs';

import { Post } from 'src/app/core/models/post';
import { PostFomGroup } from 'src/app/core/models/postFormGroup';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit, OnDestroy {
  SubTypeValueChanges: Subscription | undefined;
  postTypes = [
    { value: 'blog' },
    { value: 'video' },
    { value: 'podcast' },
    { value: 'community' },
    { value: 'release' },
  ];

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

  constructor() {
    this.postForm.controls.duration.disable();
  }

  ngOnInit() {
    this.watchTypeChanges();
  }

  ngOnDestroy() {
    this.SubTypeValueChanges?.unsubscribe();
  }

  getPostFormValue(): Post {
    return {
      slug: this.postForm.controls.slug.value,
      url: this.postForm.controls.url.value,
      type: this.postForm.controls.type.value,
      duration: this.postForm.controls.duration.value,
      title: this.postForm.controls.title.value,
      description: this.postForm.controls.description.value,
      datePosted: this.postForm.controls.datePosted.value,
      dateSource: this.postForm.controls.dateSource.value,
      sourceSite: this.postForm.controls.sourceSite.value,
      sourceUrl: this.postForm.controls.sourceUrl.value,
      authorName: this.postForm.controls.authorName.value,
      authorUrl: this.postForm.controls.authorUrl.value,
      speakers: [],
      tags: [],
    };
  }

  onUrlChange() {
    const currUrl = this.postForm.value['url'];
    // VIDEO: YouTube
    if (urlContains('https://www.youtube.com/watch?')) {
      this.setType('video');
      this.setSourceSite('YouTube');
      this.setSourceUrl('https://youtube.com');
      // VIDEO: YouTube (at current time)
    } else if (urlContains('https://youtu.be')) {
      this.setType('video');
      this.setSourceSite('YouTube');
      this.setSourceUrl('https://youtube.com');
      // BLOG: Dev.to
    } else if (urlContains('https://dev.to/')) {
      this.setType('blog');
      this.setSourceSite('DEV Community');
      this.setSourceUrl('https://dev.to');
      // BLOG: Medium
    } else if (urlContains('medium.com/')) {
      this.setType('blog');
      this.setSourceSite('Medium');
      this.setSourceUrl('https://medium.com');
      // BLOG: Hashnode
    } else if (urlContains('hashnode.dev/')) {
      this.setType('blog');
      this.setSourceSite('Hashnode');
      this.setSourceUrl('https://hashnode.com');
      // BLOG: Telerik
    } else if (urlContains('https://www.telerik.com/blogs')) {
      this.setType('blog');
      this.setSourceSite('Telerik Blogs');
      this.setSourceUrl('https://www.telerik.com/blogs');
      // PODCAST: Adventures In Angular
    } else if (urlContains('https://topenddevs.com/')) {
      this.setType('podcast');
      this.setSourceSite('Adventures in Angular');
      this.setSourceUrl('https://topenddevs.com/');
      // PODCAST: Angular Experience
    } else if (urlContains('https://www.spreaker.com/user/14532324/')) {
      this.setType('podcast');
      this.setSourceSite('Angular Experience');
      this.setSourceUrl('https://angular-experience.web.app/episodes');
      // PODCAST: WebRush
    } else if (urlContains('https://webrush.io/episodes/')) {
      this.setType('podcast');
      this.setSourceSite('WebRush');
      this.setSourceUrl('https://webrush.io');
      // RELEASE: Angular GitHub
    } else if (urlContains('https://github.com/angular/angular/releases')) {
      this.setType('release');
      this.setSourceSite('GitHub Angular Releases');
      this.setSourceUrl('https://github.com/angular/angular/releases');
    }
    function urlContains(substring: string) {
      return (currUrl!.indexOf(substring) !== -1) ? true : false;
    }
  }

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

  setType(url: string) {
    this.postForm.controls['type'].setValue(url);
  }
  setSourceSite(url: string) {
    this.postForm.controls['sourceSite'].setValue(url);
  }
  setSourceUrl(url: string) {
    this.postForm.controls['sourceUrl'].setValue(url);
  }
}
