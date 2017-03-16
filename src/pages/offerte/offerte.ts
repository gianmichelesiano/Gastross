import { Component , OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable , FirebaseObjectObservable} from 'angularfire2';
import { Observable } from 'rxjs';
import {PiattDettPage} from '../piatt-dett/piatt-dett'
import 'rxjs/add/operator/map';


import * as firebase from 'firebase'

interface Offerta {
    $key?: string;
    nomePiatto:string;
    idRistorante:string;
    tipologiaPiatto:string;
    ricetta:string;
    prezzo:string;
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
  

  constructor(public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {

      let storage = firebase.storage();
      // prendi offerte
      this.menu = af.database.object('/', { preserveSnapshot: true });
      this.menu.subscribe(snapshot => {
        let menu = snapshot.val().menu
        let ristoranti = snapshot.val().ristoranti
        for (var idRistorante in menu) {
            let menuRistorante = menu[idRistorante]
            let nomeRistorante = ristoranti[idRistorante]['nome']
         
            for (var idPiatto in menuRistorante) {
              var pathReference = storage.ref(menuRistorante[idPiatto].path);
              if (menuRistorante[idPiatto]['inOfferta'] == true){
                this.listaOfferte.push({
                                        nomeRistorante:nomeRistorante, 
                                        idRistorante:idRistorante, 
                                        piatto:menuRistorante[idPiatto],
                                        downloadURL: pathReference.getDownloadURL()
                                      })
              }
            }
        }
        console.log(this.listaOfferte)
      });
      //finisce
  }


  ngOnInit() {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OffertePage');
  }

  apriDettaglio(item, downloadURL, idRistorante, nomeRistorante ){

    item['downloadURL'] = downloadURL
    item['idRistorante'] = idRistorante
    item['nomeRistorante'] = nomeRistorante

    
    console.log(item)
    //this.navCtrl.push(RistDettPage)
    this.navCtrl.push(PiattDettPage, { item:item});
  }

  onLoad() {
    this.loading = false;
  }
}
