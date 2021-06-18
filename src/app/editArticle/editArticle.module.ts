import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ArticleFormModule} from '../shared/modules/articleForm/articleForm.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EditArticleComponent} from './components/createArticle/editArticle.component';
import {UpdateArticleEffect} from './store/effects/updateArticle.effects';
import {GetArticleEffect} from './store/effects/getArticle.effects';
import {EditArticleService} from './services/editArticle.service';
import {ArticleService as SharedArticleService} from '../article/services/article.service';
import {LoadingModule} from '../shared/modules/loading/loading.module';

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
