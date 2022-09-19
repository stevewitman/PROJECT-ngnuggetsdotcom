import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminShellComponent } from './components/admin-shell/admin-shell.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ManualUploadPostThumbsComponent } from './components/manual-upload-post-thumbs/manual-upload-post-thumbs.component';
import { ManualReverseJsonComponent } from './components/manual-reverse-json/manual-reverse-json.component';
import { ManualUploadWeekJsonComponent } from './components/manual-upload-week-json/manual-upload-week-json.component';

const routes: Routes = [
  {
    path: '',
    component: AdminShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'posts',
        children: [
          {
            path: 'add',
            component: AddPostComponent,
          },
        ],
      },
      {
        path: 'manual',
        children: [
          {
            path: 'upload-post-thumbs',
            component: ManualUploadPostThumbsComponent,
          },
          {
            path: 'reverse-json',
            component: ManualReverseJsonComponent,
          },
          {
            path: 'upload-week-json',
            component: ManualUploadWeekJsonComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
