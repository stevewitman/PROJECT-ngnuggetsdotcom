import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { AddPostComponent } from './add-post/add-post.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsPageComponent
  },
  {
    path: 'add-post',
    component: AddPostComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
