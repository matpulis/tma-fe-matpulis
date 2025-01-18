import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthStore);
  const router = inject(Router);

  // [GATE] Check if the user is authenticated
  if (authService.isAuthenticated()) return true;

  // Redirect to login and block route activation
  router.navigate(['login']);
  return false;
};
