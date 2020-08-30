import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/ingreso-egreso.actions';
import { IngresoEgreso } from '../../../models/ingreso-egreso.model';
import { AppState } from '../../../app.reducer';

export interface IngresoEgresoState {
  uid: string;
  items: IngresoEgreso[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export interface AppStateIngresoEgreso extends AppState {
  ingresosEgresos: IngresoEgresoState;
}

export const initialIngresoEgresoState: IngresoEgresoState = {
  uid: null,
  items: [],
  loaded: false,
  loading: false,
  error: null
};

const _ingresoEgresoReducer = createReducer(
  initialIngresoEgresoState,
  on(actions.clearItems, state => ( {...state, items: []} )),
  on(actions.loadItems, (state, {id}) => ( {
    ...state,
    uid: id,
    loading: true
  } )),
  on(actions.loadItemsSuccess, (state, {items}) => ( {
    ...state,
    loading: false,
    loaded: true,
    items: [...items]
  } )),
  on(actions.loadItemsFailed, (state, {payload}) => ( {
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  } )),
);

export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducer(state, action);
}
