import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { ChildrenOutletContexts, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Observable, of, Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { BreakpointService } from '../../services/breakpoint.service';
import { Animations } from '../../../shared/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [Animations.routeAnimations],
  // animations: [
  //   trigger('fadeInOut', [
  //     state(
  //       'void',
  //       style({
  //         opacity: 0,
  //       })
  //     ),
  //     transition('void <=> *', animate(3000)),
  //   ]),
  // ],
  // animations: [
  //   trigger('routeAnimations', [
  //     transition('* <=> *', [style({ opacity: 0 }), animate('1400ms ease-in')]),
  //   ]),
  // ],
})
export class SidenavComponent implements OnInit, OnDestroy {
  subscriptions?: Subscription;

  @Input() isAdmin$ = of(false);
  @ViewChild('drawer') drawerRef!: MatSidenav;

  isHandset: boolean | undefined;
  isHandset$: Observable<boolean> | undefined;
  isHandset$$: Subscription | undefined;

  showFilters = false;

  constructor(
    public breakpointService: BreakpointService,
    private router: Router,
    private contexts: ChildrenOutletContexts
  ) {
    this.subscriptions?.add(
      router.events.subscribe((e) => {
        if (e instanceof NavigationEnd && location.pathname == '/') {
          this.showFilters = true;
        }
        if (e instanceof NavigationEnd && location.pathname !== '/') {
          this.showFilters = false;
        }
      })
    );
  }

  ngOnInit() {
    this.subscriptions?.add(
      this.breakpointService.isHandset$?.subscribe((val) => {
        this.isHandset = val;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  onClickFilters() {
    this.showFilters = !this.showFilters;
  }
}
