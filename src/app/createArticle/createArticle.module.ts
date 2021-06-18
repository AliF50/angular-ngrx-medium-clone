import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CreateArticleComponent} from './components/createArticle/createArticle.component';
import {ArticleFormModule} from '../shared/modules/articleForm/articleForm.module';
import {CreateArticleService} from './services/createArticle.service';
import {EffectsModule} from '@ngrx/effects';
import {CreateArticleEffect} from './store/effects/createArticle.effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';

const routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', reducers),
  ],
  declarations: [CreateArticleComponent],
  providers: [CreateArticleService],
})
export class CreateArticleModule {}
