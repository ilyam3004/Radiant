import { Component, Input } from '@angular/core';
import {NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {AlertService} from "../../../../../domain/services/alert.service";
import {AlertModel, AlertType} from "../../../../../domain/models/alert.model";

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: AlertModel[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        if(!alert.message) {
          this.alerts.filter(x => x.keepAfterRouteChange);

          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        this.alerts.push(alert);

        if(alert.autoClose){
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart){
        this.alertService.clear(this.id);
      }
    })
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: AlertModel){
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      alert.fade = true;

      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: AlertModel) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissible', 'mt-4', 'container'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert-secondary',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning'
    }

    if (alert.type !== undefined) {
      classes.push(alertTypeClass[alert.type]);
    }

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
