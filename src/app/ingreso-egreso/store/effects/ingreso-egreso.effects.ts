import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions/ingreso-egreso.actions';
import { loadItemsFailed, loadItemsSuccess } from '../actions/ingreso-egreso.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IngresoEgresoService } from '../../../services/ingreso-egreso.service';
import { of } from 'rxjs';

@Injectable()
export class IngresoEgresoEffects {

  constructor(private actions$: Actions,
              private ingresoEgresoService: IngresoEgresoService) {
  }

  loadItems$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.loadItems),
      mergeMap(
        (action) => this.ingresoEgresoService.initIngresosEgresosLista(action.id)
          .pipe(
            map(items => loadItemsSuccess({items})),
            catchError(err => of(loadItemsFailed({payload: err})))
          )
      )
    )
  );

}
