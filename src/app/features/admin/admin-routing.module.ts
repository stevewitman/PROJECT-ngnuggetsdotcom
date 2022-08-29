import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ManualUploadPostThumbsComponent } from './components/manual-upload-post-thumbs/manual-upload-post-thumbs.component';
import { ManualReverseJsonComponent } from './components/manual-reverse-json/manual-reverse-json.component';
import { ManualUploadWeekJsonComponent } from './components/manual-upload-week-json/manual-upload-week-json.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
  },
  {
    path: 'posts',
    component: PostsPageComponent,
  },
  {
    path: 'add-post',
    component: AddPostComponent,
  },
  {
    path: 'manual-upload-post-thumbs',
    component: ManualUploadPostThumbsComponent,
  },
  {
    path: 'manual-reverse-json',
    component: ManualReverseJsonComponent,
  },
  {
    path: 'manual-upload-week-json',
    component: ManualUploadWeekJsonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
