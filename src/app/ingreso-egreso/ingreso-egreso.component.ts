import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm: FormGroup;
  tipo = 'ingreso';
  cargando = false;
  loadingSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui').subscribe(({isLoading}) => this.cargando = isLoading);

    this.ingresoEgresoForm = this.fb.group({
      descripcion: [ '' , Validators.required],
      monto: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  guardar() {
    if (this.ingresoEgresoForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading);
    const { descripcion, monto } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoEgresoForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }

}




