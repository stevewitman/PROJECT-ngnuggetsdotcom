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
      let tooltipText = '';
      if (this.post.desc) { tooltipText += `DESCRIPTION:\n${this.post.desc}\n\n`}
      if (this.post.spkrs.length != 0) { tooltipText += `SPEAKERS:\n${this.post.spkrs.toString().replace(/,/g, ', ')}\n\n`}
      if (this.post.tags.length != 0) { tooltipText += `TAGS:\n${this.post.tags.toString().replace(/,/g, ', ')}\n\n`}
      this.tooltip = tooltipText;
    }
  }

  onMoreClicked() {
    this.moreClicked.emit;
  }
}
