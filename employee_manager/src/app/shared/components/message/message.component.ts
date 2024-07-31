import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [TranslateModule, UpperCasePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  constructor(private messageService: MessageService) {}

  getMessagesLength(): number {
    return this.messageService.messages.length;
  }

  getMessages(): string[] {
    return this.messageService.messages;
  }

  clearMessages(): void {
    this.messageService.clear();
  }
}
