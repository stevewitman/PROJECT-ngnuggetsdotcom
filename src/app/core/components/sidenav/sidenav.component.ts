import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { BreakpointService } from '../../services/breakpoint.service';
import { Animations } from '../../../shared/animations'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    Animations.staggerList,
    Animations.routeAnimation
  ],
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawerRef!: MatSidenav;

  isHandset: boolean | undefined;
  isHandset$: Observable<boolean> | undefined;
  isHandset$$: Subscription | undefined;

  showFilters = false;

  constructor(
    public breakpointService: BreakpointService,
    private router: Router
  ) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && location.pathname == '/') {
        this.showFilters = true;
      }
      if (e instanceof NavigationEnd && location.pathname !== '/') {
        this.showFilters = false;
      }
    });
  }

  ngOnInit() {
    this.isHandset$$ = this.breakpointService.isHandset$?.subscribe(val => {
      this.isHandset = val;
    });
  }

  ngOnDestroy() {
    this.isHandset$$?.unsubscribe()
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['position']
    );
  }

  onClickFilters() {
    this.showFilters = !this.showFilters;
  }
}
