import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _isVisible = signal<boolean>(false);
  private _modalTitle = signal<string | undefined>(undefined);
  private _modalText = signal<string | undefined>(undefined);

  get isVisible() {
    return this._isVisible.asReadonly();
  }
  get modalTitle() {
    return this._modalTitle.asReadonly();
  }
  get modalText() {
    return this._modalText.asReadonly();
  }

  private onAccept: (() => void) | null = null;
  private onDecline: (() => void) | null = null;

  setModalContent(title: string, details: string): void {
    this._modalTitle.set(title);
    this._modalText.set(details);
  }

  clearModalContent(): void {
    this._modalTitle.set(undefined);
    this._modalText.set(undefined);
  }

  showModal(onAccept?: () => void, onDecline?: () => void): void {
    this.onAccept = onAccept || null;
    this.onDecline = onDecline || null;
    this._isVisible.set(true);
  }

  hideModal(): void {
    this._isVisible.set(false);
  }

  toggleModal(): void {
    this._isVisible.update((current) => !current);
  }

  accept() {
    if (this.onAccept) {
      this.onAccept();
    }
    this.hideModal();
    this.clearModalContent();
  }

  decline() {
    if (this.onDecline) {
      this.onDecline();
    }
    this.hideModal();
    this.clearModalContent();
  }
}
