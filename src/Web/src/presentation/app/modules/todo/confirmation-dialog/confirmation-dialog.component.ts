import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() title: string = "Title";
  @Input() message: string = "Message";
  @Input() btnOkText: string = "OK";
  @Input() btnCancelText: string = "Cancel";

  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void { }

  public decline(): void {
    this.modal.close(false);
  }

  public accept(): void {
    this.modal.close(true);
  }

  public dismiss(): void {
    this.modal.dismiss();
  }
}
