import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../../../models/ingreso-egreso.model';

export const clearItems = createAction('[IngresoEgreso] Clear Items');

export const loadItems = createAction(
  '[IngresoEgreso] Load Items',
  props<{ id: string }>()
);

export const loadItemsSuccess = createAction(
  '[IngresoEgreso] Load Success Items',
  props<{ items: IngresoEgreso[] }>()
);

export const loadItemsFailed = createAction(
  '[IngresoEgreso] Load Failed Items',
  props<{ payload: any }>());
