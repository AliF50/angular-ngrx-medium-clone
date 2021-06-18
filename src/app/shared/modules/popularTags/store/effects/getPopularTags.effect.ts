import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  getPopularTagsAction,
  getPopularTagsSuccessAction,
  getPopularTagsFailure,
} from '../actions/getPopularTags.action';
import {PopularTagsService} from '../../services/popularTags.service';
import {PopularTagType} from '../../../../types/popularTag.type';

@Injectable()
export class GetPopularTagsEffect {
  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({popularTags});
          }),
          catchError(() => {
            return of(getPopularTagsFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}
}
