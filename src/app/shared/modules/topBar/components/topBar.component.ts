import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppStateInterface} from 'src/app/shared/types/appState.interface';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {
  isLoggedInSelector,
  isAnonymousSelector,
  currentUserSelector,
} from '../../../../auth/store/selectors';

@Component({
  selector: 'mc-topbar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.compnent.scss'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean | null>;
  isAnonymous$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}
