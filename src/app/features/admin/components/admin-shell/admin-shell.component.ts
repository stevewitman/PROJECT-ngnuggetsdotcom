import { Component, OnInit } from '@angular/core';

import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-admin-shell',
  templateUrl: './admin-shell.component.html',
  styleUrls: ['./admin-shell.component.scss'],
  animations: [Animations.routeAnimations],
})
export class AdminShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
