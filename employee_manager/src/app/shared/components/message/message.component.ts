import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [TranslateModule, UpperCasePipe, MatCardModule, MatButtonModule, BottomSheetComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  constructor(
    private messageService: MessageService,
    private _bottomSheet: MatBottomSheet
  ) {}

  openBottomSheet(): void {
    if (this.getMessagesLength()) {
      this._bottomSheet.open(BottomSheetComponent);
    }
  }

  getMessagesLength(): number {
    return this.messageService.messages.length;
  }
}
