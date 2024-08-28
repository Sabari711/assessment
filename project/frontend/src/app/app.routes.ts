import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { userAuthGuard } from './guard/user-auth.guard';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
  { path: '', redirectTo: './', pathMatch: 'full' },
  { path: './', component: HomeComponent },
  {
    path: 'users-list',
    component: UserListComponent,
    canActivate: [userAuthGuard],
  },
];
