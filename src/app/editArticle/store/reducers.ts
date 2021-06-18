import {Action, createReducer, on} from '@ngrx/store';
import {EditArticleStateInterface} from '../types/editArticle.interface';
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from './actions/getArticle.actions';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from './actions/updateArticle.actions.';

const initialState: EditArticleStateInterface = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null,
};

const editArticleReducer = createReducer(
  initialState,
  on(
    updateArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    getArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article,
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    updateArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
);

export function reducers(state: EditArticleStateInterface, action: Action) {
  return editArticleReducer(state, action);
}
