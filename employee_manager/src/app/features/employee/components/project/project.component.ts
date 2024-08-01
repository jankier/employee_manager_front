import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatChipsModule, MatIconModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  @Input({ required: true }) project!: string;

  @Output() selectedProject: EventEmitter<string> = new EventEmitter<string>();

  onSelected(value: string): void {
    this.selectedProject.emit(value);
  }
}
