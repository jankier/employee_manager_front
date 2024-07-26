import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent {
  @Input() skill?: string = '';

  @Output() selectedSkill: EventEmitter<string> = new EventEmitter<string>();

  onSelected(value: string): void {
    this.selectedSkill.emit(value);
  }
}
