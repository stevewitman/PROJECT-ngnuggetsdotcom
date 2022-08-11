import { FormControl } from "@angular/forms";

export interface PostFomGroup
  {
    slug: FormControl<string>;
    url: FormControl<string>;
    type: FormControl<string>;
    duration: FormControl<string | null>;
    title: FormControl<string>;
    description: FormControl<string>;
    datePosted: FormControl<string>;
    dateSource: FormControl<string>;
    sourceSite: FormControl<string>;
    sourceUrl: FormControl<string>;
    authorName: FormControl<string>;
    authorUrl: FormControl<string>;
    speakers: FormControl<string[]>;
    tags: FormControl<string[]>;
  };