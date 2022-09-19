import { AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core'

import { Observable, of } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  isAdmin$: Observable<boolean> = of(false);

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin;
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
}
