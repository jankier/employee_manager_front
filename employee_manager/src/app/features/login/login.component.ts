import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../services/snackbar.service';
import { Paths } from '../../../enums/paths.enum';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, TranslateModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginUserService: AuthService,
    private snackBarService: SnackbarService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.nonNullable.group({
      username: [''],
      password: [''],
    });
  }

  get usernameControl(): FormControl {
    return this.loginForm.controls['username'] as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.controls['password'] as FormControl;
  }

  onLogin() {
    this.loginUserService
      .login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || `/${Paths.DASHBOARD}`;
          this.router.navigate([returnUrl]).then();
        },
        error: () => {
          this.snackBarService.openSnackBar('invalid-login', 'snackbar');
        },
        complete: () => {
          this.messageService.add(`login ${this.loginForm.value.username}`);
        },
      });
  }
}
