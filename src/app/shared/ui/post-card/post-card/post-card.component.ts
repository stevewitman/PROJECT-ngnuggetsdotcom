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
        this.post.description
      }\n\nSPEAKERS:\n${this.post.speakers
        .toString()
        .replace(/,/g, ', ')}\n\nDATE POSTED:\n${
        this.post.datePosted
      }\n\nDATE CREATED:\n${this.post.dateSource}\n\nTAGS:\n${this.post.tags
        .toString()
        .replace(/,/g, ', ')}\n\n`;
    }
  }

  onMoreClicked() {
    this.moreClicked.emit;
  }
}
