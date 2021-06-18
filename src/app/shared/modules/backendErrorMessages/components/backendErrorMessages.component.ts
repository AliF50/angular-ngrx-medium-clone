import {Component, Input, OnInit} from '@angular/core';
import {BackendErrorsInterface} from '../../../types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorProps: BackendErrorsInterface | null;

  errorMessages: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorProps || {}).map(
      (name: string) => {
        const messages = (this.backendErrorProps || {})[name].join(' ');
        return `${name} ${messages}`;
      }
    );
  }
}
