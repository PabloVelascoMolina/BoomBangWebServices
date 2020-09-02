import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AresRoutingModule} from './ares-routing.module';

import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AresComponent} from './ares.component';
import {TitleService} from './services/title.service';
import {environment} from 'src/environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from './modules/layout/layout.module';
import {LanguageService} from './services/language.service';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';

import { NotFoundComponent } from './components/not-found/not-found.component';
import {LogoutComponent} from './components/logout/logout.component';

import {QuicklinkModule} from 'ngx-quicklink';

// Locales
import {registerLocaleData} from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeENUS from '@angular/common/locales/en';
import {HttpLoaderInterceptor} from './interceptors/http-loader.interceptor';
import {HttpLoaderService} from './services/http-loader.service';
import {ClientModule} from './modules/client/client.module';

registerLocaleData(localeDE);
registerLocaleData(localeENUS);

declare var console;

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    AresComponent,
    LogoutComponent,
    NotFoundComponent,
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
    LayoutModule,
    QuicklinkModule,
    ClientModule
  ],
  providers: [
    TitleService,
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
    this.image('data:image/png;base64,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OnV6ZfXq1cvgtZvq1q3basqUKZNfeumlmwAlPKpwLl68uNu0adOmWyyWOPXaJUuWLBw8eHAmPPas6rCsZ2fNmjVv06ZNy2G9/2nWrNkd48ePf3bmzJlt0PIAfprBEhN0bJiqaCQdIBiucO06VeVw3tkSl5ZoMLXXfvaq/RJBseK+uM9TUsDRNqJZgNFULsOMV1Nuuim6+39HNZk5JKru5PYRsQ+lm613xRrMLZyKUnFGsn+/rCxn+vOlf05/35n7I9JX0KNHj0bLli2bHBMTkzR//vyFELqPxo0bt/fQoUN2QFGn1157rSNUtOkRERFRc+bMWfD3v//93SeeeOJnGAqLfOfAsOt55plnDvTs2XM9XL5kt9tLRo0a9fTKlStvJZWbmZl509ChQ5/Mycn545577nmxf//+m1544YWjP/zwQxnQwArbemr48OG7O3fuvAKq4ysul8s2efLk5yGonSjt5hlHgFmyzBDKnE+7TttHPae5MaqZCRhTfB95oZ4tVWQVSpJLRztBb2tS4yej0m8eFlV/kNloSNSWCyUsCnY+zqCAaBdQnMWy59RvcvmW5fbsWWNKj7652ZN/6oBcVpwjufzfklYq54mGQYMG9VTD47x5896DynGsqKhIAsFKETCA3bt3Txw9evRQk8kUAZVsxezZs49funRJIl0DwTDAcJ47derUt20226UHH3xwaK9evVIAZv44ZMiQ+8vLywsfeOCB9/fu3WsrLvbmV9rXIwFlw/LA888/fxQq4RL4IMRDhRzYrVu3eM248GS5wmEWNRp8PPM935IJGQjsmP8cGHLbBH7LONBPSo5sno74LB6YzGOjGt68JK7V449Fpv2jr7XOuCbGyF5AMUThyi9VpOyfnCVr33PkvpVZemrTdmfROVIf1HmTqnYw1LaEc7Ydy5cvPw341ME4adKkW+G8rOGnn376r3feeScHcCoMDMsX3nzzzY+io6PrzJgx4070OASufnJycpODBw/+eurUKRfAg4OW792GincWJjvfwGlCpzvuuKMB5lyecIsbay7jSThoFbDWSQ31WitTbEIinFfhoKgMw7Jzq6PgOHqd1kzAZGhrjE56PCr9piXxLcd+mNB+zQBr6vRmpsh7Yw2mG1R1w0Inu8+uLM997uGS36a+VnH6668gdFVfTtXWFdT2hISERiUlJflw0P8D1cl3DhXA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');
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
