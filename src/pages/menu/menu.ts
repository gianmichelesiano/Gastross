import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {PiattDettPage} from '../piatt-dett/piatt-dett'

import * as firebase from 'firebase'


interface Piatto {
    $key?: string;
    nomePiatto:string;
    idRistorante:string;
    nomeRistorante:string;
    tipologiaPiatto:string;
    ricetta:string;
    prezzo:string;
    downloadURL?: string;
    path: string; 
    inOfferta:boolean;
    prezzoOfferta: string; 
}


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  loading: boolean = true
  item:any
  menu: FirebaseListObservable<any>;
  piattiList : Observable<Piatto[]>;
  public idRistorante: string;
  public nomeRistorante: string;
  public inOfferta: boolean=false;
  public prezzoOfferta: string = '';

  constructor(public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
  	
  	let storage = firebase.storage();
  	this.item = navParams.get('item')
  	this.idRistorante = this.item.$key;
    this.nomeRistorante = this.item.nome;
    this.menu = af.database.list('/menu/'+this.idRistorante);

    this.piattiList = this.menu.map( itemList =>
        itemList.map( item => {
            var pathReference = storage.ref(item.path);
            let result = {
                          $key: item.$key, 
                          downloadURL: pathReference.getDownloadURL(), 
                          idRistorante:this.idRistorante,  
                          nomeRistorante: this.nomeRistorante,
                          path: item.path, 
                          nomePiatto: item.nomePiatto, 
                          tipologiaPiatto: item.tipologiaPiatto, 
                          ricetta: item.ricetta, 
                          prezzo: item.prezzo,
                          inOfferta: item.inOfferta,
                          prezzoOfferta: item.prezzoOfferta,
                          dataScadenza: item.dataScadenza
                        };
            console.log(result);
            return result;
        })
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  apriDettaglio(item){
  	//this.navCtrl.push(RistDettPage)
  	this.navCtrl.push(PiattDettPage, { item:item });
  }

  onLoad() {
    this.loading = false;
  }

}
