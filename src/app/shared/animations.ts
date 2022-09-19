import { trigger, style, transition, animate, group, query, stagger, animateChild } from '@angular/animations';

export const Animations = {
  // staggerList: trigger('staggerList', [
  //   transition(':enter', [
  //     style({ height: '0px' }),
  //     group([
  //       animate('250ms ease-in-out', style({ height: '*', opacity: 1 })),
  //       query('a', style({ opacity: 0 }), { optional: true }),
  //       query(
  //         'a',
  //         stagger('40ms', [
  //           animate(
  //             '40ms ease-in-out',
  //             style({
  //               opacity: 1,
  //             })
  //           ),
  //         ]),
  //         { optional: true }
  //       ),
  //     ]),
  //   ]),
  //   transition(':leave', [
  //     style({ height: '*' }),
  //     group([
  //       animate('250ms ease-out', style({ height: '0px', opacity: 1 })),
  //       query('a', style({ opacity: 1 }), { optional: true }),
  //       query(
  //         'a',
  //         stagger('-40ms', [
  //           animate(
  //             '40ms ease-out',
  //             style({
  //               opacity: 0,
  //             })
  //           ),
  //         ]),
  //         { optional: true }
  //       ),
  //     ]),
  //   ]),
  // ]),

  routeAnimations:  trigger('routeAnimations', [
    transition('* <=> *', [style({ opacity: 0 }), animate('400ms ease-in')]),
  ]),
  
}
