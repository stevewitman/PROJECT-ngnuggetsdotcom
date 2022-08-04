import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderMainToolbarComponent } from './components/header-main-toolbar/header-main-toolbar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
  declarations: [HeaderComponent, LayoutComponent, HeaderMainToolbarComponent, SideNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  exports: [LayoutComponent],
})
export class CoreModule {}
