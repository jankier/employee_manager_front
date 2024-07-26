import { Component, Input } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [NgClass, UpperCasePipe],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  menuStatus = false;

  @Input() languages: string[] = [];
  @Input() currentLang!: string;
  @Input() translateService!: any;

  switchLang(language: string): void {
    this.currentLang = language;
    this.translateService.use(language);
    this.menuStatus = !this.menuStatus;
    this.checkCurrentLang(this.currentLang);
  }

  checkCurrentLang(language: string): boolean {
    return this.currentLang === language;
  }
}
