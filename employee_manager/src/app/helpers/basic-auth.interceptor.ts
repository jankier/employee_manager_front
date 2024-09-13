import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment.development';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    const user = this.authService.userValue;
    const isLoggedIn = user?.authData;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Basic ${user.authData}`,
        },
      });
    }
    return next.handle(request);
  }
}
