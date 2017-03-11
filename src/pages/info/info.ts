import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Info page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  dataTesto = {1:'lun', 2:'mar',3:'mer',4:'gio',5:'ven',6:'sab',7:'dom'}
  item:any
  stato:string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.item = navParams.get('item')
  	console.log(this.item.giorniApertura)
  	var data = new Date();
 
  	let status  = this.item.giorniApertura.indexOf(this.dataTesto[data.getDay()])
 	if (status != -1){
 		this.stato = 'Aperto'
 	} else {
 		this.stato = 'Chiuso'
 	}
  	console.log(status)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
