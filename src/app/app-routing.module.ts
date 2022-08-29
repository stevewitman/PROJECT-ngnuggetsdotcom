import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts'
    // loadChildren: () => import('./features/posts/posts.module').then(m  => m.PostsModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m  => m.HomeModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./features/posts/posts.module').then(m  => m.PostsModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m  => m.AboutModule)
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
