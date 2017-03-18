import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { Ionic2RatingModule } from 'ionic2-rating';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { LOCALE_ID } from '@angular/core';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { RistListPage } from '../pages/rist-list/rist-list';
import { RistDettPage } from '../pages/rist-dett/rist-dett';
import { PiattListPage } from '../pages/piatt-list/piatt-list';
import { PiattDettPage } from '../pages/piatt-dett/piatt-dett';
import { OrdListPage } from '../pages/ord-list/ord-list';
import { OrdDettPage } from '../pages/ord-dett/ord-dett';
import { OffertePage } from '../pages/offerte/offerte';
import { ImpostazioniPage } from '../pages/impostazioni/impostazioni';
import { CarrelloPage } from '../pages/carrello/carrello';
import { ChatPage } from '../pages/chat/chat';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { DatiPersonaliPage } from '../pages/dati-personali/dati-personali';
import {MenuPage } from '../pages/menu/menu'
import {InfoPage } from '../pages/info/info'
import {RecensioniPage } from '../pages/recensioni/recensioni'
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { IonicImageLoader } from 'ionic-image-loader';

import { OrdineContantiPage } from '../pages/ordine-contanti/ordine-contanti';
import { OrdineCartaPage } from '../pages/ordine-carta/ordine-carta';

import { Http} from '@angular/http';
import { TranslateModule, TranslateStaticLoader, TranslateLoader  } from 'ng2-translate/ng2-translate';


const cloudSettings: CloudSettings = { 
  'core': {
    'app_id': '0ab63964'
  },
}; 

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}  

export const firebaseConfig = {
  apiKey: 'AIzaSyAD1ZodtGDUmPIZUI7e_leAERDjh80jNKc',
  authDomain: 'speeats.firebaseapp.com',
  databaseURL: 'https://speeats.firebaseio.com',
  storageBucket: 'speeats.appspot.com',
  messagingSenderId: '955979856036'
};

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,

    ListPage,
    RistListPage,
    RistDettPage,
    PiattListPage,
    PiattDettPage,
    OrdListPage,
    OrdDettPage,
    OffertePage,
    ImpostazioniPage,
    CarrelloPage,
    ChatPage,
    IntroPage,
    LoginPage,
    LogoutPage,
    MenuPage,
    InfoPage,
    RecensioniPage,
    DatiPersonaliPage,
    OrdineContantiPage,
    OrdineCartaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    LazyLoadImageModule,
    Ionic2RatingModule,
    IonicImageLoader,
    CloudModule.forRoot(cloudSettings),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,

    ListPage,
    RistListPage,
    RistDettPage,
    PiattListPage,
    PiattDettPage,
    OrdListPage,
    OrdDettPage,
    OffertePage,
    ImpostazioniPage,
    CarrelloPage,
    ChatPage,
    IntroPage,
    LoginPage,
    LogoutPage,
    MenuPage,
    InfoPage,
    RecensioniPage,
    DatiPersonaliPage,
    OrdineContantiPage,
    OrdineCartaPage
  ],
  providers: [
              {provide: ErrorHandler, useClass: IonicErrorHandler},
              { provide: LOCALE_ID, useValue: "it-IT" }
             ]
})
export class AppModule {}
