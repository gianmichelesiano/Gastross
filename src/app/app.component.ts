import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

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

import {ImageLazyLoadModule, WebWorkerService} from 'ng2-image-lazy-load';

WebWorkerService.workerUrl = 'assets/js/xhrWorker.js';
WebWorkerService.enabled = true;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Ristoranti', component: RistListPage },
      { title: 'Dettaglio Ristoranti', component: RistDettPage },
      { title: 'Piatti', component: PiattListPage },
      { title: 'Piatto Dettaglio', component: PiattDettPage },
      { title: 'Ordini', component: OrdListPage },
      { title: 'Ordine Dettaglio', component: OrdDettPage },
      { title: 'Offerte', component: OffertePage },
      { title: 'Impostazioni', component: ImpostazioniPage },
      { title: 'Carrello', component: CarrelloPage },
      { title: 'Chat', component: ChatPage },
      { title: 'Intro', component: IntroPage },
      { title: 'Login', component: LoginPage },
      { title: 'Logout', component: LogoutPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
