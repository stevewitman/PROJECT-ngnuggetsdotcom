import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: Post = {} as Post;
  @Output() moreClicked = new EventEmitter();
  tooltip: string = '';

  ngOnInit() {
    if (this.post) {
      this.tooltip = `${this.post.slug}\n\nTITLE:\n${
        this.post.title
      }\n\nDESCRIPTION:\n${
        this.post.desc
      }\n\nSPEAKERS:\n${this.post.spkrs
        .toString()
        .replace(/,/g, ', ')}\n\nDATE POSTED:\n${
        this.post.dAdd
      }\n\nDATE CREATED:\n${this.post.dSrc}\n\nTAGS:\n${this.post.tags
        .toString()
        .replace(/,/g, ', ')}\n\n`;
    }
  }

  onMoreClicked() {
    this.moreClicked.emit;
  }
}
