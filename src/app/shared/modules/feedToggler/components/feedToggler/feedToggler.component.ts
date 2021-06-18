import {Component, Input, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppStateInterface} from '../../../../types/appState.interface';
import {isLoggedInSelector} from '../../../../../auth/store/selectors';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps: string | null;

  isLoggedIn$: Observable<boolean | null>;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
