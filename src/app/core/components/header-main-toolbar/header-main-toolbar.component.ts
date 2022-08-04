import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-main-toolbar',
  templateUrl: './header-main-toolbar.component.html',
  styleUrls: ['./header-main-toolbar.component.scss'],
})
export class HeaderMainToolbarComponent implements OnInit {
  @Input() drawerOpen = false;

  @Output() toggleDrawer = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}
}
