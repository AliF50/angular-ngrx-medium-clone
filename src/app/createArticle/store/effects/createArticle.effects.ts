import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {CreateArticleService} from '../../services/createArticle.service';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '../actions/createArticle.actions';
import {ArticleInterface} from '../../../shared/types/article.interface';

@Injectable()
export class CreateArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({articleInput}) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleFailureAction({errors: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}
}
