import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  animate,
  group,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('staggerList', [
      transition(':enter', [
        style({ height: '0px' }),
        group([
          animate('250ms ease-in-out', style({ height: '*', opacity: 1 })),
          query('a', style({ opacity: 0 }), { optional: true }),
          query(
            'a',
            stagger('40ms', [
              animate(
                '40ms ease-in-out',
                style({
                  opacity: 1,
                })
              ),
            ]),
            { optional: true }
          ),
        ]),
      ]),
      transition(':leave', [
        style({ height: '*' }),
        group([
          animate('250ms ease-out', style({ height: '0px', opacity: 1 })),
          query('a', style({ opacity: 1 }), { optional: true }),
          query(
            'a',
            stagger('-40ms', [
              animate(
                '40ms ease-out',
                style({
                  opacity: 0,
                })
              ),
            ]),
            { optional: true }
          ),
        ]),
      ]),
    ]),
    trigger('routeAnimations', [
      transition('* <=> *', [style({ opacity: 0 }), animate('400ms ease-in')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isHandset!: boolean;

  showFilters = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
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
    this.isHandset$.subscribe((value) => {
      this.isHandset = value;
    });
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['position']
    );
  }

  onClickFilters() {
    this.showFilters = !this.showFilters;
  }
}
