import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() listElements?: string[];

  @Output() selectedElement: EventEmitter<string> = new EventEmitter<string>();

  onSelected(value: string): void {
    this.selectedElement.emit(value);
  }
}
