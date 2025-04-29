import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { BaseAlert } from '../base-alert';

@Component({
  selector: 'app-error-alert',
  imports: [NgClass],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.css',
})
export class ErrorAlertComponent extends BaseAlert{
  message = input.required<string>();
}
