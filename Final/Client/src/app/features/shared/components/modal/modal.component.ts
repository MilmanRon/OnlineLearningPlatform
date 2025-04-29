import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
    modalService = inject(ModalService);

    closeModal(){
        this.modalService.hideModal();
    }

    accept(){
        this.modalService.accept();
    }

    decline(){
        this.modalService.decline();
    }


}
