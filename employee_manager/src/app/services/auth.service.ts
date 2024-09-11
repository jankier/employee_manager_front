import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment.development';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Paths } from '../../enums/paths.enum';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(environment.loginUrl, { username, password }, this.httpOptions).pipe(
      map((user) => {
        user.authData = btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.messageService.clear();
    this.userSubject.next(null);
    this.router.navigate([Paths.LOGIN]).then();
  }

  public isAuthorized(allowedRoles: string[]): boolean {
    const user = this.userValue;
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }
}
