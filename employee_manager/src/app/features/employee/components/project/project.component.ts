import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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
