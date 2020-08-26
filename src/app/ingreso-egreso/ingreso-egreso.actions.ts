import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unSetItems = createAction('[IngresoEgreso] UnSetItems');

export const setItems = createAction(
  '[IngresoEgreso] SetItems',
  props<{ items: IngresoEgreso[] }>()
);
