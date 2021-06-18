import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable, Subscription, combineLatest} from 'rxjs';
import {AppStateInterface} from 'src/app/shared/types/appState.interface';
import {UserProfileInterface} from '../../types/userProfile.interface';
import {getUserProfileAction} from '../../store/actions/getUserProfile.actions';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {userProfileSelector} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {
  isLoadingSelector,
  errorSelector,
} from '../../../article/store/selectors';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfileInterface | null;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  userProfileSubscription: Subscription;
  apiUrl: string;
  slug: string | null;
  isCurrentUserProfile$: Observable<boolean>;

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(
        select(currentUserSelector),
        filter((currentUser) => !!currentUser)
      ),
      this.store.pipe(
        select(userProfileSelector),
        filter((userProfile) => !!userProfile)
      )
    ).pipe(
      map(([currentUser, userProfile]) => {
        return currentUser?.username === userProfile?.username;
      })
    );
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile) => (this.userProfile = userProfile));

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug}));
  }
}
