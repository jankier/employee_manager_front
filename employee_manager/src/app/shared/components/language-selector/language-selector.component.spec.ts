import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectorComponent } from './language-selector.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.config';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LanguageSelectorComponent', (): void => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let loader: HarnessLoader;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorComponent, MatButtonModule, MatMenuModule, NoopAnimationsModule],
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('language menu should open and close', async (): Promise<void> => {
    const menu: MatMenuHarness = await loader.getHarness(MatMenuHarness.with({ selector: `[data-testid="lang-menu"]` }));
    expect(await menu.isOpen()).toBe(false);
    await menu.open();
    expect(await menu.isOpen()).toBe(true);
    await menu.close();
    expect(await menu.isOpen()).toBe(false);
  });

  it('should get all language menu items', async (): Promise<void> => {
    component.languages = ['en', 'pl'];
    const menu: MatMenuHarness = await loader.getHarness(MatMenuHarness.with({ selector: `[data-testid="lang-menu"]` }));
    await menu.open();
    expect((await menu.getItems()).length).toBe(2);
  });

  it('should switch translate language to pl and en', async (): Promise<void> => {
    spyOn(component, 'switchLang');
    component.languages = ['en', 'pl'];
    component.currentLang = 'en';
    const menu: MatMenuHarness = await loader.getHarness(MatMenuHarness.with({ selector: `[data-testid="lang-menu"]` }));
    await menu.open();
    await menu.clickItem({ text: 'PL' });
    expect(component.switchLang).toHaveBeenCalledWith('pl');
    await menu.clickItem({ text: 'EN' });
    expect(component.switchLang).toHaveBeenCalledWith('en');
  });
});
