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
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCardModule } from 'src/app/shared/ui/post-card/post-card.module';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ManualReverseJsonComponent } from './components/manual-reverse-json/manual-reverse-json.component';
import { ManualUploadPostThumbsComponent } from './components/manual-upload-post-thumbs/manual-upload-post-thumbs.component';
import { ManualUploadWeekJsonComponent } from './components/manual-upload-week-json/manual-upload-week-json.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AdminShellComponent } from './components/admin-shell/admin-shell.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostsPageComponent,
    AddPostComponent,
    ManualUploadPostThumbsComponent,
    ManualReverseJsonComponent,
    ManualUploadWeekJsonComponent,
    AdminNavComponent,
    AdminShellComponent,
  ],
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
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
})
export class AdminModule {}
