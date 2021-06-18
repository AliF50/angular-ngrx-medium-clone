import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStateInterface} from './shared/types/appState.interface';
import {getCurrentUserAction} from './auth/store/actions/getCurrentUser.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }
}
