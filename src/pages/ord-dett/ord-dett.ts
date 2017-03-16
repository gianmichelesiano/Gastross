import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';
import { User } from '@ionic/cloud-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase'


interface NewPiatto {
    $key?: string;
    downloadURL?: string;
    inOfferta:boolean;
    nomeRistorante:string;
    nomePiatto:string;
    quantity:string;
    prezzo:string;
    prezzoOfferta: string; 
    path: string;   
}


@Component({
  selector: 'page-ord-dett',
  templateUrl: 'ord-dett.html'
})
export class OrdDettPage {
  loading: boolean = true
  ordineDettaglio: FirebaseListObservable<any>;
  ordineDettaglioConFoto : Observable<NewPiatto[]>;
  key:any
  constructor(public user: User, public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
    let storage = firebase.storage();
  	this.key = navParams.get('key')
  	console.log(this.key)
  	this.ordineDettaglio = this.af.database.list('ordini/'+this.user.id+'/'+this.key+'/ordine')
    
    this.ordineDettaglioConFoto = this.ordineDettaglio.map( itemList =>
        itemList.map( item => {
            console.log(item)
            var pathReference = storage.ref(item.path);
            let result = {
                          $key: item.$key, 
                          downloadURL: pathReference.getDownloadURL(), 
                          inOfferta: item.inOfferta,
                          nomeRistorante: item.nomeRistorante,
                          nomePiatto: item.nomePiatto, 
                          quantity:item.quantity,
                          prezzo: item.prezzo,
                          path: item.path, 
                          prezzoOfferta: item.prezzoOfferta,
                        };
            console.log(result);
            return result;
        })
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdDettPage');
  }

  onLoad() {
    this.loading = false;
  }

} 
