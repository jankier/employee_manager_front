import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { SkillProject } from '../../../../models/skill-project.model';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [TranslateModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() listElements?: SkillProject[];
  @Input() elementType: string = '';

  @ViewChild('element') element?: MatSelect;
  @Output() selectedElement: EventEmitter<SkillProject> = new EventEmitter<SkillProject>();

  onSelected(value: SkillProject): void {
    this.element?.writeValue('');
    this.selectedElement.emit(value);
  }
}
