import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../../../../models/employee.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss',
})
export class DialogDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee) {}
}
