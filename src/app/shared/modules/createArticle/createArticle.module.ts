import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CreateArticleComponent} from '../../../createArticle/components/createArticle/createArticle.component';

const routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [CreateArticleComponent],
})
export class CreateArticleModule {}
