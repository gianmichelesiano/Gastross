import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase'
import {RistDettPage} from '../rist-dett/rist-dett'

interface Ristorante {
    $key?: string;
    nome:string;
    indirizzo:string;
    ordineMin:string;
    costoConsegna:string;
    giorniApertura:string;
    maxTempoConsegna:string;
    tipologia:string;
    downloadURL?: string;
    path: string;  
}

@Component({
  selector: 'page-rist-list',
  templateUrl: 'rist-list.html'
})
export class RistListPage {

  totale:number=0

  loading: boolean = true
  ristoranti: FirebaseListObservable<any>;
  ristoranteList : Observable<Ristorante[]>;

  constructor(af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {

  	 let storage = firebase.storage();
     this.ristoranti = af.database.list('/ristoranti');
     console.log(this.ristoranti)

    this.ristoranteList = this.ristoranti.map( itemList =>
        itemList.map( item => {
            var pathReference = storage.ref(item.path);
            let result = {$key: item.$key, downloadURL: pathReference.getDownloadURL(), 
              path: item.path, 
              nome: item.nome, 
              indirizzo: item.indirizzo, 
              ordineMin: item.ordineMin,
              costoConsegna: item.costoConsegna, 
              giorniApertura: item.giorniApertura, 
              maxTempoConsegna: item.maxTempoConsegna, 
              tipologia: item.tipologia
            };
            console.log(result);
            return result;
        })
    );
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RistListPage');
  }

  apriDettaglio(item){
  	//this.navCtrl.push(RistDettPage)
  	this.navCtrl.push(RistDettPage, { item:item });
  }

  onLoad() {
    this.loading = false;
  }

}
