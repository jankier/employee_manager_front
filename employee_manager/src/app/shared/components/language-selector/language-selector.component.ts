import { Component, Input } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [NgClass, UpperCasePipe, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  @Input() languages: string[] = [];
  @Input({ required: true }) currentLang!: string;

  constructor(public translate: TranslateService) {}

  switchLang(language: string): void {
    this.currentLang = language;
    this.translate.use(language);
    this.checkCurrentLang(this.currentLang);
  }

  checkCurrentLang(language: string): boolean {
    return this.currentLang === language;
  }
}
