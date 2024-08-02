import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [TranslateModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() listElements?: string[];
  @Input() elementType = '';

  @ViewChild('element') element?: MatSelect;
  @Output() selectedElement: EventEmitter<string> = new EventEmitter<string>();

  onSelected(value: string): void {
    this.element?.writeValue('');
    this.selectedElement.emit(value);
  }
}
