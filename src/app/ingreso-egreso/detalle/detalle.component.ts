import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateIngresoEgreso } from '../ingreso-egreso.reducers';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppStateIngresoEgreso>,
              private ingresoEgresoService: IngresoEgresoService) {
  }

  ingresosEgresosSubscription: Subscription;
  ingresosEgresos: IngresoEgreso[] = [];

  ngOnInit() {
    this.ingresosEgresosSubscription = this.store.select('ingresosEgresos').subscribe(({items}) => this.ingresosEgresos = items);
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription.unsubscribe();
  }

  delete(idItem: any) {
    this.ingresoEgresoService.deleteIngresoEgreso(idItem)
      .then(() => Swal.fire('Borrado  ', 'Item borrado', 'success'))
      .catch(err => Swal.fire('Borrado  ', err.message, 'error'));
  }


}
