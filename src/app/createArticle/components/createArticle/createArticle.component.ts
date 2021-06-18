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
import {createArticleAction} from '../../store/actions/createArticle.actions';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  styleUrls: ['./createArticle.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(articleInput: ArticleInputInterface) {
    this.store.dispatch(createArticleAction({articleInput}));
  }
}
