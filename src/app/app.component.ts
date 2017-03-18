import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { RistListPage } from '../pages/rist-list/rist-list';
import { OrdListPage } from '../pages/ord-list/ord-list';
import { OffertePage } from '../pages/offerte/offerte';
import { ImpostazioniPage } from '../pages/impostazioni/impostazioni';
import { CarrelloPage } from '../pages/carrello/carrello';
import { ChatPage } from '../pages/chat/chat';
import { IntroPage } from '../pages/intro/intro';
import { LogoutPage } from '../pages/logout/logout';
import { DatiPersonaliPage } from '../pages/dati-personali/dati-personali';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any, icona: string, numero: string }>;
  pagesDestra: Array<{title: string, component: any, icona: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();


     

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HelloIonicPage, icona: 'home' , numero:''},
      { title: 'Ristoranti', component: RistListPage, icona: 'restaurant', numero:'6' },
      { title: 'Ordini', component: OrdListPage, icona: 'card', numero:'5' },
      { title: 'Carrello', component: CarrelloPage, icona: 'cart', numero:'' },
      { title: 'Offerte', component: OffertePage, icona: 'body',  numero:'6'},
      { title: 'Chat', component: ChatPage, icona: 'chatbubbles', numero:'' },

    ];

    this.pagesDestra = [
      { title: 'Dati Personali', component: DatiPersonaliPage, icona: 'contact' },
      { title: 'Impostazioni', component: ImpostazioniPage, icona: 'settings' },  
      { title: 'Intro', component: IntroPage, icona: 'eye' },
      { title: 'Logout', component: LogoutPage, icona: 'exit' },
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
