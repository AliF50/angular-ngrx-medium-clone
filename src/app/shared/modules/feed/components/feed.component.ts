import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {parseUrl, stringify} from 'query-string';

import {AppStateInterface} from 'src/app/shared/types/appState.interface';
import {getFeedAction} from '../store/actions/getFeed.action';
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface';
import {environment} from '../../../../../environments/environment';
import {
  feedSelector,
  errorSelector,
  isLoadingSelector,
} from '../store/selectors';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps: string;

  feed$: Observable<GetFeedResponseInterface | null>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  limit = environment.limit;
  baseUrl: string;
  queryParamsSubcription: Subscription;
  currentPage: number;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes.apiUrlProps.firstChange &&
      changes.apiUrlProps.currentValue !== changes.apiUrlProps.previousValue;
    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnDestroy(): void {
    this.queryParamsSubcription.unsubscribe();
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubcription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params.page || '1');
        this.fetchFeed();
      }
    );
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const stringifiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
  }
}
