import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserProfileInterface} from '../../types/userProfile.interface';
import {
  getUserProfileAction,
  getUserProfileSuccessAction,
  getUserProfileFailureAction,
} from '../actions/getUserProfile.actions';
import {UserProfileService} from '../../services/userProfile.service';

@Injectable()
export class GetUserProfileEffect {
  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({slug}) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfileInterface) => {
            return getUserProfileSuccessAction({userProfile});
          }),
          catchError(() => {
            return of(getUserProfileFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}
}
