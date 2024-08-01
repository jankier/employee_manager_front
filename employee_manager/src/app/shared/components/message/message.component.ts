import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [TranslateModule, UpperCasePipe, MatCardModule, MatButtonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  constructor(public messageService: MessageService) {}
}
