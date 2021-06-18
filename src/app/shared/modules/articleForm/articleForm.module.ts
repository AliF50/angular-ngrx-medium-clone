import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ArticleFormComponent} from './components/articleForm/articleForm.component';
import {BackendErrorMessageModule} from '../backendErrorMessages/backendErrorMessages.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, BackendErrorMessageModule, ReactiveFormsModule],
  declarations: [ArticleFormComponent],
  exports: [ArticleFormComponent],
})
export class ArticleFormModule {}
