import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';
import { Paths } from '../../enums/paths.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    const allowedRoles = route.data['roles'] as string[];
    if (this.authService.isAuthorized(allowedRoles)) {
      return true;
    } else if (this.authService.userValue) {
      this.router.navigate([Paths.DASHBOARD]).then();
    } else {
      this.router.navigate(['/']).then();
    }
    this.snackBarService.openSnackBar('unauthenticated', 'snackbar');
    return false;
  }
}
