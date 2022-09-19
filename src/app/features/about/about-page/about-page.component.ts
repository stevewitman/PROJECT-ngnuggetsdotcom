import { Component, OnInit } from '@angular/core';

import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  animations: [Animations.routeAnimations],
})
export class AboutPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
