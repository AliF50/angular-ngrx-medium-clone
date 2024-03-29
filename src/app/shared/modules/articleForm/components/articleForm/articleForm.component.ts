import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BackendErrorsInterface} from '../../../../types/backendErrors.interface';
import {ArticleInputInterface} from '../../../../types/articleInput.interface';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps: ArticleInputInterface | null;
  @Input('isSubmitting') isSubmittingProps: boolean | null;
  @Input('errors') errorsProps: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent =
    new EventEmitter<ArticleInputInterface>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValuesProps?.title,
      description: this.initialValuesProps?.description,
      body: this.initialValuesProps?.body,
      tagList: this.initialValuesProps?.tagList.join(' '),
    });
  }

  onSubmit(): void {
    this.articleSubmitEvent.emit(this.form.value);
  }
}
