import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtilsService } from '../../shared/utils/form-utils.service';
import { UserStore } from '../../../data/store/user.store';
import { ApiUserRepository } from '../../../data/repositories/api-user.repository';
import { NotificationService } from '../../shared/services/notification.service';
import { Role, User } from '../../../core/domain/Models/user.model';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent {
  modalService = inject(ModalService);
  formUtils = inject(FormUtilsService);
  userStore = inject(UserStore);
  apiUserRepository = inject(ApiUserRepository);
  notificationService = inject(NotificationService);

  isProcessing = signal<boolean>(false);

  Role = Role;

  editUserForm = new FormGroup({
    name: new FormControl(this.userStore.user()?.name, [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl(this.userStore.user()?.email, [
      Validators.required,
      Validators.email,
    ]),
  });

  get name() {
    return this.editUserForm.get('name');
  }

  get email() {
    return this.editUserForm.get('email');
  }

  onSubmit() {
    if (this.editUserForm.invalid) {
      this.editUserForm.markAllAsTouched();
      return;
    }

    const user = this.editUserForm.value as Partial<User>;

    this.editUser(user);
  }

  editUser(editedUser: Partial<User>) {
    this.isProcessing.set(true);

    this.apiUserRepository
      .update(this.userStore.user()?.id ?? '', editedUser)
      .subscribe({
        next: () => {
          this.notificationService.notifySuccess('User updated succefully !');
          this.isProcessing.set(false);
        },
        error: (error) => {
          this.notificationService.notifyError(
            'Error updating user, please try again.'
          );
          this.isProcessing.set(false);
        },
      });
  }

  deleteUser() {
    this.modalService.setModalContent(
      'Course Delete Confirmation',
      `Are you sure you want to delete your profile ?`
    );

    this.modalService.showModal(
      // On Accept callback
      () => {
        this.processUserDelete();
      },

      // On Decline callback
      () => {
        console.log('Delete canceled by user');
      }
    );
  }

  processUserDelete() {
    this.isProcessing.set(true);

    if (!this.userStore.user()) {
      console.log('User must be logged in');
      this.isProcessing.set(false);
      return;
    }

    this.apiUserRepository.delete(this.userStore.user()?.id ?? '').subscribe({
      next: () => {
        this.isProcessing.set(false);
      },
      error: () => {
        this.notificationService.notifyError(
          'Unable to delete profile, please try again.'
        );
        this.isProcessing.set(false);
      },
    });
  }
}
