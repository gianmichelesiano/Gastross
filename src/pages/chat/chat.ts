import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Chat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  chats: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	 this.chats = [
  	 	{
  	 	  nome: 'Marco',
  	 	  avatar: "assets/avatar/m.png",
  	 	  titolo: 'Quando è pronto il mio ordine?',
          descrizione:"Quando è pronto il mio ordine?",
  	 	  data : Math.floor(Date.now() / 1000)
  	 	},
  	 	{
  	 	  nome: 'Maria',
  	 	  avatar: "assets/avatar/f.png",
  	 	  titolo: 'Interessante',
  	 	  descrizione: "E' appena partita la consegna",
  	 	  data : Math.floor(Date.now() / 1000)
  	 	}
  	 ] 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  send(chatBox){
  	let buovo  =   	 	{
  	 	  nome: 'Marco',
  	 	  avatar: "assets/avatar/m.png",
  	 	  titolo: 'Quando è pronto il mio ordine?',
          descrizione:chatBox,
  	 	  data : Math.floor(Date.now() / 1000)
  	 	}
  	this.chats.push(buovo)
  	console.log(chatBox)
  	return this.chats
  }

}
