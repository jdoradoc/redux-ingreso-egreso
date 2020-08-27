import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as ingresosEgresosActions from '../ingreso-egreso/ingreso-egreso.actions';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  ingresosEgresosSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({user}) => {
        this.ingresosEgresosSubscription = this.ingresoEgresoService.initIngresosEgresosLista(user.uid)
          .subscribe(ingresosEgresos => {
            this.store.dispatch(ingresosEgresosActions.setItems({items: ingresosEgresos}));
          });
      });
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.store.dispatch(ingresosEgresosActions.unSetItems());
  }

}
