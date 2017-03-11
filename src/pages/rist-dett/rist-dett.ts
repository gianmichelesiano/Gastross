import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MenuPage } from '../menu/menu'
import {InfoPage } from '../info/info'
import {RecensioniPage } from '../recensioni/recensioni'



@Component({
  selector: 'page-rist-dett',
  templateUrl: 'rist-dett.html'
})
export class RistDettPage {
  item:any
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.item = navParams.get('item')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RistDettPage');
  }

  
  apriMenu(item){
  	this.navCtrl.push(MenuPage, { item:item });
  }

  apriInfo(item){
  	this.navCtrl.push(InfoPage, { item:item });
  }

  apriRecensioni(item){
  	this.navCtrl.push(RecensioniPage, { item:item });
  }




}
