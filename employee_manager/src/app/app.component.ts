import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './shared/components/language-selector/language-selector.component';
import { MessageComponent } from './shared/components/message/message.component';
import { HeaderComponent } from './shared/components/layout/header/header.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LanguageSelectorComponent, MessageComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');

    const browserLang: string | undefined = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|pl/) ? browserLang : 'en');
  }
}
