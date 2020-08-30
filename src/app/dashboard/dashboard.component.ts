import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../ingreso-egreso/store/actions';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({user}) => {
        this.store.dispatch(actions.loadItems({id: user.uid}));
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.store.dispatch(actions.clearItems());
  }

}
