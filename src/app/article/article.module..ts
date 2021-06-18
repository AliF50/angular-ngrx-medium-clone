import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {ArticleComponent} from './components/article.component';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {reducers} from './store/reducers';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {ErrorMessageModule} from '../shared/modules/errorMessage/errorMessage.module';
import {TagListModule} from '../shared/modules/tagList/tagList.module';
import {DeleteArticleEffect} from './store/effects/deleteArticle.effect';
import {ArticleService} from './services/article.service';

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    LoadingModule,
    ErrorMessageModule,
    TagListModule,
  ],
  declarations: [ArticleComponent],
  exports: [ArticleComponent],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
