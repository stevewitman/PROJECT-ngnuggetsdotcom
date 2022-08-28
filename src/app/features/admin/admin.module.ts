import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AdminRoutingModule } from './admin-routing.module';
import { PostCardModule } from 'src/app/shared/ui/post-card/post-card.module';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ManualUploadPostThumbsComponent } from './components/manual-upload-post-thumbs/manual-upload-post-thumbs.component';
import { ManualJsonToFirestoreComponent } from './components/manual-json-to-firestore/manual-json-to-firestore.component';

@NgModule({
  declarations: [PostsPageComponent, AddPostComponent, ManualUploadPostThumbsComponent, ManualJsonToFirestoreComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    PostCardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class AdminModule {}
