import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {AppStateInterface} from '../../../shared/types/appState.interface';
import {ActivatedRoute} from '@angular/router';
import {getArticleAction} from '../../store/actions/getArticle.actions';
import {isLoadingSelector, articleSelector} from '../../store/selectors';
import {filter, map} from 'rxjs/operators';
import {updateArticleAction} from '../../store/actions/updateArticle.actions.';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
  styleUrls: ['./editArticle.component.scss'],
})
export class EditArticleComponent implements OnInit {
  slug: string | null;
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  isSubmitting$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  initialValues$: Observable<ArticleInputInterface>;

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter((article) => !!article),
      map(
        (article) =>
          ({
            title: article?.title,
            description: article?.description,
            body: article?.body,
            tagList: article?.tagList,
          } as ArticleInputInterface)
      )
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  onSubmit(articleInput: ArticleInputInterface) {
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}));
  }
}
