import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeesService } from '../../services/employees.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MessageService } from '../../services/message.service';
import { User } from '../../../models/user.model';
import { validatePassword } from '../../shared/validators/password.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInput, TranslateModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  hideCurrent: boolean = true;
  hideNew: boolean = true;
  user: User | null = null;
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private snackBarService: SnackbarService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.passwordForm = this.fb.nonNullable.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30), validatePassword()]],
    });

    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  get currentPasswordControl(): FormControl {
    return this.passwordForm.controls['currentPassword'] as FormControl;
  }

  get newPasswordControl(): FormControl {
    return this.passwordForm.controls['newPassword'] as FormControl;
  }

  onPasswordChange() {
    this.employeesService
      .updatePassword(this.user?.id, this.passwordForm.controls['currentPassword'].value, this.passwordForm.controls['newPassword'].value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.messageService.add(`logout ${this.user?.username}`);
          this.authService.logout();
        },
        error: (): void => {
          this.snackBarService.openSnackBar('incorrect-password', 'snackbar');
        },
        complete: (): void => {
          this.messageService.add('changed-password');
        },
      });
  }
}
