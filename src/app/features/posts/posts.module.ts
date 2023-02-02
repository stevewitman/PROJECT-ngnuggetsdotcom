import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { PostCardModule } from '../../shared/ui/post-card/post-card.module';


@NgModule({
  declarations: [PostsPageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    PostsRoutingModule,
    MatProgressSpinnerModule,
    PostCardModule,
  ],
})
export class PostsModule {}
