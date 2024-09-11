import { Component } from '@angular/core';
import { LanguageSelectorComponent } from '../../language-selector/language-selector.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Paths } from '../../../../../enums/paths.enum';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../../../services/auth.service';
import { MessageService } from '../../../../services/message.service';
import { User } from '../../../../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageSelectorComponent, RouterLink, RouterLinkActive, TranslateModule, MatIcon, MatIconButton, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly Paths = Paths;
  user: User | null = null;
  userIsPresent: boolean = false;

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user;
      this.userIsPresent = user !== null;
    });
  }

  logoutUser() {
    this.messageService.add(`logout ${this.user?.username}`);
    this.authService.logout();
  }
}
