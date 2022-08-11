import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/core/models/post';

import { PostFomGroup } from 'src/app/core/models/postFormGroup';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  postForm = new FormGroup<PostFomGroup>({
    slug: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    url: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    duration: new FormControl<string | null>(null),
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    datePosted: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    dateSource: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    sourceSite: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    sourceUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    authorName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    authorUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    speakers: new FormControl<string[]>([], { nonNullable: true }),
    tags: new FormControl<string[]>([], { nonNullable: true }),
  });

  test: Post = {
    slug: '2022-07-29-P',
    type: 'video',
    duration: '15',
    title:
      'Angular 14 Project to Read & Display JSON Data inside Bootstrap 4 Table in Browser Using TypeScript',
    url: 'https://www.youtube.com/watch?v=7UCZFl-sJlU',
    description: 'jhg',
    datePosted: '2022-07-29',
    dateSource: '2022-07-29',
    sourceSite: 'YouTube',
    sourceUrl: 'https://youtube.com',
    authorName: 'Coding Shiksha',
    authorUrl: 'https://www.youtube.com/c/CodingShiksha/videos',
    speakers: ['Gautam Sharma'],
    tags: ['JSON', 'Bootstrap'],
  };

  constructor() {}

  tooltip: string = '';

  ngOnInit() {
    this.postForm.controls.duration.disable()
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
}
