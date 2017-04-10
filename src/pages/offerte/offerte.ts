import { Component , OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable , FirebaseObjectObservable} from 'angularfire2';
//import { Observable } from 'rxjs';
import {PiattDettPage} from '../piatt-dett/piatt-dett'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


import * as firebase from 'firebase'

interface Offerta {
    $key?: string;
    nomePiatto:string;
    idRistorante:string;
    tipologiaPiatto:string;
    ricetta:string;
    prezzo:string;
    prezzoOfferta:string;
    dataScadenza:string;
    downloadURL?: string;
    path: string;  
}


@Component({
  selector: 'page-offerte',
  templateUrl: 'offerte.html'
})
export class OffertePage implements OnInit {
  
  loading: boolean = true
  listaOfferte = []
  menu: FirebaseObjectObservable<any>;
  offerte : FirebaseListObservable<any>;
  ristoranteObject: FirebaseObjectObservable<any>;
  offerteList : Observable<Offerta[]>;
  

  constructor(public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {

      let storage = firebase.storage();


      this.offerte = af.database.list('/menu', {
        query: {
          orderByChild: 'inOfferta',
          equalTo: true
        }
      });

      this.offerteList = this.offerte.map( itemList =>
        itemList.map( item => {
            var pathReference = storage.ref(item.path);
            let result = {$key: item.$key, idRistorante:item.idRistorante, inOfferta:item.inOfferta, prezzoOfferta:item.prezzoOfferta, dataScadenza:item.dataScadenza, downloadURL: pathReference.getDownloadURL(), path: item.path, nomePiatto: item.nomePiatto, tipologiaPiatto: item.tipologiaPiatto, ricetta: item.ricetta, prezzo: item.prezzo};
            let nomeRistorante = af.database.object('/ristoranti/'+item.idRistorante).subscribe( res => {
               console.log(res.nome)
               result['nomeRistorante'] = res.nome
            })
            return result;
        })
     );
      //finisce
  }


  ngOnInit() {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OffertePage');
  }

  apriDettaglio(item){
    this.navCtrl.push(PiattDettPage, { item:item });
  }

  onLoad() {
    this.loading = false;
  }
}
