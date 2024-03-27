import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from "../../modules/todo/confirmation-dialog/confirmation-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private modal: NgbModal) { }

  public confirm(title: string, message: string,
    btnOkText: string = 'OK', btnCancelText: string = 'Cancel'): Promise<boolean> {

    const modalRef = this.modal.open(ConfirmationDialogComponent);

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
