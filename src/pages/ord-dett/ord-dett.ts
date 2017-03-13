import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';

/*
  Generated class for the OrdDett page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ord-dett',
  templateUrl: 'ord-dett.html'
})
export class OrdDettPage {
  ordineLista: FirebaseListObservable<any>;
  key:any
  constructor(public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
  	this.key = navParams.get('key')
  	console.log(this.key)
  	this.ordineLista = this.af.database.list('/ordini/'+this.key+'/ordine')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdDettPage');
  }

}
