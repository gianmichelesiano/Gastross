import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import {ImageLazyLoadModule, WebWorkerService} from 'ng2-image-lazy-load';
import { Ionic2RatingModule } from 'ionic2-rating';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
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

import {MenuPage } from '../pages/menu/menu'
import {InfoPage } from '../pages/info/info'
import {RecensioniPage } from '../pages/recensioni/recensioni'

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '0ab63964'
  },
};

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
    ItemDetailsPage,
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
    RecensioniPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ImageLazyLoadModule,
    Ionic2RatingModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
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
    RecensioniPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}