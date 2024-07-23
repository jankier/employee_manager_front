import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Skills } from '../../enums/skills.enum';
import { Projects } from '../../enums/projects.enum';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() listElements?: Skills[] | Projects[];

  @Output() selectedElement: EventEmitter<string> = new EventEmitter<string>();

  onSelected(value: string) {
    this.selectedElement.emit(value);
  }
}
