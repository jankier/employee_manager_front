import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          this.authService.logout();
        }

        return throwError(() => err);
      })
    );
  }
}
