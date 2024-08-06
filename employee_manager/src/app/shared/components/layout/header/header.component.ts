import { Component } from '@angular/core';
import { LanguageSelectorComponent } from '../../language-selector/language-selector.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Paths } from '../../../../../enums/paths.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageSelectorComponent, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly Paths = Paths;
  constructor(public translate: TranslateService) {}
}
