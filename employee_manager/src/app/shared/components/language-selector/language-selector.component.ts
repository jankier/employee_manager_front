import { Component, Input } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

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
  @Input({ required: true }) currentLang!: string;

  constructor(public translate: TranslateService) {}

  switchLang(language: string): void {
    this.currentLang = language;
    this.translate.use(language);
    this.menuStatus = !this.menuStatus;
    this.checkCurrentLang(this.currentLang);
  }

  checkCurrentLang(language: string): boolean {
    return this.currentLang === language;
  }
}
