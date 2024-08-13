import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import translationsEN from '../../../../public/assets/i18n/en.json';
import translationsPL from '../../../../public/assets/i18n/pl.json';
import { HttpLoaderFactory } from '../../app.config';

describe('ListComponent', (): void => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;
  const languagePL = translationsPL;
  const languageEN = translationsEN;
  let translate: TranslateService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        provideHttpClient(),
        importProvidersFrom(
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
            },
          })
        ),
        provideRouter(routes),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should translate title to pl', (): void => {
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('p').textContent;
    expect(title).toEqual('LIST.EMPLOYEES');
    translate.getTranslation('pl').subscribe((value): void => {
      const translation = value[title.split('.')[0].toLowerCase()][title.split('.')[1].toLowerCase()];
      expect(translation).toEqual(languagePL.list.employees);
    });
  });

  it('should translate title to en', (): void => {
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('p').textContent;
    expect(title).toEqual('LIST.EMPLOYEES');
    translate.getTranslation('en').subscribe((value): void => {
      const translation = value[title.split('.')[0].toLowerCase()][title.split('.')[1].toLowerCase()];
      expect(translation).toEqual(languageEN.list.employees);
    });
  });
});
