import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  name = '';

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('user')
      .pipe(filter(({user}) => user != null))
      .subscribe(({user}) => this.name = user.nombre);
  }

  logout() {
    this.authService.logout().then(() => {
      return this.router.navigate(['/login']);
    });
  }

}
