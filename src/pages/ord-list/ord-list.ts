import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';
import { User } from '@ionic/cloud-angular';
import {OrdDettPage} from '../ord-dett/ord-dett'
/*
  Generated class for the OrdList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ord-list',
  templateUrl: 'ord-list.html'
})
export class OrdListPage {
  ordini: FirebaseListObservable<any>;
  constructor(public af: AngularFire, public user: User, public navCtrl: NavController, public navParams: NavParams) {

  	this.ordini = this.af.database.list('/ordini/'+this.user.id ).
            map((array) => array.reverse()) as FirebaseListObservable<any[]>;
   }

  apriDettaglioOrdine(key){
  	this.navCtrl.push(OrdDettPage,  { key:key });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdListPage');
  }

}
