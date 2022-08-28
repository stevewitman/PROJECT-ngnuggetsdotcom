import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { PostCardModule } from '../../shared/ui/post-card/post-card.module';


@NgModule({
  declarations: [PostsPageComponent],
  imports: [CommonModule, PostsRoutingModule, PostCardModule],
})
export class PostsModule {}
