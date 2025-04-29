import { Component, input, signal } from '@angular/core';
import { BaseAlert } from '../base-alert';

@Component({
  selector: 'app-success-alert',
  imports: [],
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.css'
})
export class SuccessAlertComponent extends BaseAlert{
    message = input.required<string>();
}
