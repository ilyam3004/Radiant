import {filter, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import {AlertModel, AlertOptions, AlertType} from "../models/alert.model";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<AlertModel>();
  private defaultId = 'default-alert';

  onAlert(id = this.defaultId): Observable<AlertModel> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, options?: AlertOptions) {
    this.alert(new AlertModel({ ...options, type: AlertType.Success, message, autoClose: true }));
  }

  error(message: string, options?: AlertOptions) {
    this.alert(new AlertModel({ ...options, type: AlertType.Error, message, autoClose: true }));
  }

  info(message: string, options?: AlertOptions) {
    this.alert(new AlertModel({ ...options, type: AlertType.Info, message, autoClose: true }));
  }

  warn(message: string, options?: AlertOptions) {
    this.alert(new AlertModel({ ...options, type: AlertType.Warning, message }));
  }

  alert(alert: AlertModel) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new AlertModel({ id }));
  }
}
