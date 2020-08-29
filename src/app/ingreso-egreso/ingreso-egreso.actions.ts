import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const clearItems = createAction('[IngresoEgreso] Clear Items');

export const loadItems = createAction(
  '[IngresoEgreso] Load Items',
  props<{ items: IngresoEgreso[] }>()
);
