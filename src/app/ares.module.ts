import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AresRoutingModule} from './ares-routing.module';
import {environment} from '../environments/environment';

import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from './_layout/layout.module';

import {ClientModule} from './client/client.module';
import {SharedModule} from './_shared/shared.module';

import {AresComponent} from './ares.component';

import {LanguageService} from './_shared/service/language.service';

import {JwtInterceptor} from './_interceptor/jwt.interceptor';
import {ErrorInterceptor} from './_interceptor/error.interceptor';
import {HttpLoaderInterceptor} from './_interceptor/http-loader.interceptor';

import {QuicklinkModule} from 'ngx-quicklink';

import {registerLocaleData} from '@angular/common';

import localeDE from '@angular/common/locales/de';
import localeENUS from '@angular/common/locales/en';
import {HttpLoaderService} from './_service/http-loader.service';

registerLocaleData(localeDE);
registerLocaleData(localeENUS);

declare var console;

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    AresComponent
  ],
  imports: [
    BrowserModule,
    AresRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    QuicklinkModule,
    SharedModule,
    LayoutModule,
    ClientModule
  ],
  providers: [
    HttpLoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true},
    {
      provide: LOCALE_ID,
      useFactory: (languageService) => languageService.getCurrentCulture(),
      deps: [LanguageService]
    }
  ],
  bootstrap: [AresComponent]
})
export class AresModule {
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang(environment.app.defaultLang);

    if (translate.getLangs().indexOf(this.languageService.language) === -1) {
      this.languageService.language = environment.app.defaultLang;
    }

    translate.use(this.languageService.language);

    // tslint:disable-next-line:max-line-length
    this.image('');
  }

  image(url: string) {
    const image = new Image();

    image.onload = () => {
      const style = `
        font-size: 1px;
        padding: 3.5rem 3.5rem 3.5rem 10rem;
        background-size: contain;
        background: url('${url}');
        background-repeat: no-repeat;
      `;

      console.log(`%c `, style);
    };
    image.src = url;
  }
}
