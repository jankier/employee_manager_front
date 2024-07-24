import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() listElements?: string[];

  @Output() selectedElement: EventEmitter<string> = new EventEmitter<string>();

  onSelected(value: string) {
    this.selectedElement.emit(value);
  }
}
