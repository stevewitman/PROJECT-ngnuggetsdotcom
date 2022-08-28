import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./features/posts/posts.module').then(m  => m.PostsModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m  => m.HomeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m  => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
