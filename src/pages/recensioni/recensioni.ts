import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Recensioni page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recensioni',
  templateUrl: 'recensioni.html'

})
export class RecensioniPage {
  rate : number;
  recensioni: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	 this.recensioni = [
  	 	{
  	 	  nome: 'Marco',
  	 	  avatar: "/assets/avatar/m.png",
  	 	  titolo: 'Fantastico',
          descrizione:"Servizio veramente eccezionale",
  	 	  stelle:5,
  	 	  data : ''
  	 	},
  	 	{
  	 	  nome: 'Maria',
  	 	  avatar: "/assets/avatar/f.png",
  	 	  titolo: 'Interessante',
  	 	  descrizione: 'Mi aspettavo qualcosa di meglio sopratutto per quello che dicevano',
  	 	  stelle:3,
  	 	  data : ''
  	 	}
  	 ] 
  	 this.rate = 3
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecensioniPage');
  }



}
