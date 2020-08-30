import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';
import { AppStateIngresoEgreso } from '../store/reducers/ingreso-egreso.reducers';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  totalIngresos = 0;
  ingresos = 0;
  totalGastos = 0;
  gastos = 0;
  private uiSubscription: Subscription;
  chartLabels: Label[] = ['Ingresos', 'Gastos'];
  chartData: MultiDataSet = [[]];
  loading = false;
  error = false;

  constructor(private store: Store<AppStateIngresoEgreso>) {
  }

  ngOnInit() {
    this.uiSubscription = this.store.select('ingresosEgresos')
      .subscribe(({items, loading, error}) => {
        this.generarEstadisticas(items);
        this.loading = loading;
        this.error = error;
      });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }


  generarEstadisticas(items: IngresoEgreso[]) {

    this.totalGastos = 0;
    this.totalIngresos = 0;
    this.gastos = 0;
    this.ingresos = 0;

    items.forEach(item => {
      if ( item.tipo === 'ingreso' ) {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalGastos += item.monto;
        this.gastos++;
      }
    });

    this.chartData = [[this.totalIngresos, this.totalGastos]];
  }


}
