import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
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
  listaordineDettaglio: FirebaseListObservable<any>;
  oggettoRistorante: FirebaseObjectObservable<any>;

  ordineDettaglioConFoto : Observable<NewPiatto[]>;
  
  
  listaTutti = []


  ordine:any
  idOrdine:any
  constructor(public user: User, public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
   
  	
    this.idOrdine = navParams.get('idOrdine')
    console.log(this.idOrdine)

    this.listaordineDettaglio = af.database.list('/ordiniRistoranti', {
                              query: {
                                orderByChild: 'idOrdine',
                                equalTo: this.idOrdine
                              }
                            });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdDettPage');
  }

  onLoad() {
    this.loading = false;
  }

} 
