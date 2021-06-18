import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {ArticleInterface} from '../../../shared/types/article.interface';
import {ArticleService as SharedArticleService} from './../../../shared/services/article.service';
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from '../actions/getArticle.actions';

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({article});
          }),
          catchError(() => {
            return of(getArticleFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
    private router: Router
  ) {}
}
