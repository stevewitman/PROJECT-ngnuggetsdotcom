import { Component, OnInit } from '@angular/core';

import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [Animations.routeAnimations],
})
export class ContactComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
