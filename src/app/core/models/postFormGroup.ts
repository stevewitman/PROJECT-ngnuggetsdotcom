import { FormControl } from "@angular/forms";

export interface PostFomGroup
  {
    slug: FormControl<string>;
    url: FormControl<string>;
    type: FormControl<string>;
    dur: FormControl<string | null>;
    title: FormControl<string>;
    desc: FormControl<string>;
    dAdd: FormControl<string>;
    dSrc: FormControl<string>;
    srcSite: FormControl<string>;
    srcUrl: FormControl<string>;
    aName: FormControl<string>;
    aUrl: FormControl<string>;
    spkrs: FormControl<string[]>;
    tags: FormControl<string[]>;
  };