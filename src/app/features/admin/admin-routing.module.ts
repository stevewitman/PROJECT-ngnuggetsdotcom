import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ManualUploadPostThumbsComponent } from './components/manual-upload-post-thumbs/manual-upload-post-thumbs.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
