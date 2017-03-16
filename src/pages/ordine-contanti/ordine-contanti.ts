import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the OrdineContanti page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ordine-contanti',
  templateUrl: 'ordine-contanti.html'
})
export class OrdineContantiPage {

  totale: string
  idCliente: string
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.totale = navParams.get('totale')
    this.idCliente = navParams.get('idCliente')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdineContantiPage');
  }

}
