import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';


@Component({
  selector: 'page-impostazioni',
  templateUrl: 'impostazioni.html'
})
export class ImpostazioniPage {


  constructor(public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImpostazioniPage');
  }


  cambiaLingua(lingua){
    console.log(lingua)
    if (lingua=='en'){
      return this.translate.setDefaultLang('en');
    }
    if (lingua=='de'){
      return this.translate.setDefaultLang('de');
    }
    if (lingua=='it'){
      return this.translate.setDefaultLang('it');
    }
  }

}
