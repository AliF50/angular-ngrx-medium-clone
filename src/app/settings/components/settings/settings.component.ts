import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppStateInterface} from '../../../shared/types/appState.interface';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter} from 'rxjs/operators';
import {Subscription, Observable} from 'rxjs';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface';
import {CurrentUserInputInterface} from '../../../shared/types/currentUserInput.interface';
import {updateCurrentUserAction} from '../../../auth/store/actions/updateCurrentUser.action';
import {logoutAction} from '../../../auth/store/actions/sync.action';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currentUser: CurrentUserInterface | null;
  currentUserSubcription: Subscription;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubcription.unsubscribe();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeListeners(): void {
    this.currentUserSubcription = this.store
      .pipe(
        select(currentUserSelector),
        filter((currentUser) => !!currentUser)
      )
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser?.image,
      username: this.currentUser?.username,
      bio: this.currentUser?.bio,
      email: this.currentUser?.email,
      password: '',
    });
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(updateCurrentUserAction({currentUserInput}));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
