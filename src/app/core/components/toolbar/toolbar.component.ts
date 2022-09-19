import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() drawerOpen: any;
  @Input() isAdmin$: Observable<boolean> = of(false)

  @Output() toggleDrawer = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}
}
