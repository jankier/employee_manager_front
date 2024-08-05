import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent {
  @Input() skill: string = '';

  @Output() selectedSkill: EventEmitter<string> = new EventEmitter<string>();

  onSelected(value: string): void {
    this.selectedSkill.emit(value);
  }
}
