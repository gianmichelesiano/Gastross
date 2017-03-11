import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CarrelloPage } from '../carrello/carrello'
import { LoginPage } from '../login/login'
import { Auth, User } from '@ionic/cloud-angular';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-piatt-dett',
  templateUrl: 'piatt-dett.html'
})
export class PiattDettPage {
  
  rootPage: any
  item:any
  quantity:number=1
  carrello: FirebaseListObservable<any>;
  constructor(public alertCtrl: AlertController, public auth: Auth, public user: User, public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
  	this.item = navParams.get('item')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PiattDettPage');
  }
  add(){
    return this.quantity++;
  }

  remove(){
    if (this.quantity > 0){
        return this.quantity--;
    } else {
        return 0;
    }
  }

  aggiungiAlCarrello(item, quantity){

    if(this.auth.isAuthenticated()) {
          this.carrello = this.af.database.list('/carrello/'+this.user.id);
          this.carrello.push({ key:item.$key, nomePiatto:item.nomePiatto, prezzo:item.prezzo, path:item.path,quantity:quantity }).then((item) => { console.log(item.key); });          
          this.navCtrl.push(CarrelloPage)
    } else {
          let alert = this.alertCtrl.create({
          title: 'Attenzione!',
          subTitle: 'Per continuare devi essere registrato!',
          buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(LoginPage)

    }

  }


}
