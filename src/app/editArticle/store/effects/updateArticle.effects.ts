import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

import {EditArticleService} from '../../services/editArticle.service';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {
  updateArticleAction,
  updateArticleSuccessAction,
  updateArticleFailureAction,
} from '../actions/updateArticle.actions.';

@Injectable()
export class UpdateArticleEffect {
  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({slug, articleInput}) => {
        return this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) => {
            return updateArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateArticleFailureAction({errors: errorResponse.error.errors})
            );
          })
        );
      })
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({article}) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}
}
