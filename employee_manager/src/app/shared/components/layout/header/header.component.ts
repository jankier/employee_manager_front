import { Component, HostListener, OnInit } from '@angular/core';
import { LanguageSelectorComponent } from '../../language-selector/language-selector.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Paths } from '../../../../../enums/paths.enum';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageSelectorComponent, RouterLink, RouterLinkActive, TranslateModule, MatIcon, MatIconButton, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  protected readonly Paths = Paths;

  smallScreenWidth: number = 860; // px
  isSmallScreen: boolean = false;
  screenWidth: number = 0;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.checkIfSmallScreen();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenWidth = window.innerWidth;
    this.checkIfSmallScreen();
  }

  checkIfSmallScreen(): void {
    this.isSmallScreen = this.screenWidth <= this.smallScreenWidth;
  }

  constructor(public translate: TranslateService) {}
}
