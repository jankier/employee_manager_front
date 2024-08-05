import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatNavList } from '@angular/material/list';
import { MessageService } from '../../../../../services/message.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [MatButton, MatCard, MatCardContent, TranslateModule, MatNavList, UpperCasePipe],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
  constructor(
    private messageService: MessageService,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) {}

  getMessages(): string[] {
    return this.messageService.messages;
  }

  clearMessages(): void {
    this.messageService.clear();
    this._bottomSheetRef.dismiss();
  }
}
