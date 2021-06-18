import {Action, createReducer, on} from '@ngrx/store';
import {UserProfileStateInterface} from '../types/userProfileState.interface';
import {
  getUserProfileAction,
  getUserProfileSuccessAction,
} from './actions/getUserProfile.actions';
const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const userProfileReducer = createReducer(
  initialState,
  on(
    getUserProfileAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getUserProfileSuccessAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })
  ),
  on(
    getUserProfileAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducers(state: UserProfileStateInterface, action: Action) {
  return userProfileReducer(state, action);
}
