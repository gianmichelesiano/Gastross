import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import { User } from '@ionic/cloud-angular';

import {OrdListPage} from '../ord-list/ord-list'

/*
  Generated class for the OrdineCarta page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ordine-carta',
  templateUrl: 'ordine-carta.html'
})
export class OrdineCartaPage {

  totale: string
  idCliente: string
  idOrdine: string
  data: string

  informazioni : FirebaseObjectObservable<any>;
  ordine : FirebaseObjectObservable<any>;
  ordineList : FirebaseListObservable<any>;

  constructor(private toastCtrl: ToastController, public loadingCtrl:LoadingController, public user: User, public af:AngularFire, public navCtrl: NavController, public navParams: NavParams) {


    this.totale = navParams.get('totale')
    this.idCliente = navParams.get('idCliente')
    this.idOrdine = navParams.get('idOrdine')
    this.data = navParams.get('data')
    console.log('--------------')
    console.log(this.idOrdine)

    this.informazioni = this.af.database.object('clienti/'+this.idCliente+'/datiPersonali/');
    console.log('clienti/'+this.idCliente+'/datiPersonali/')


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdineCartaPage');
  }

  pagaOrdine(indirizzo){

    var data = Math.floor(Date.now() / 1000)
  	this.ordine = this.af.database.object('ordini/'+this.idCliente+'/'+this.idOrdine);
  	this.ordine.update({indirizzoSpedizione:indirizzo, pagato:true})



    this.ordineList = this.af.database.list('ordini/'+this.idCliente+'/'+this.idOrdine+'/ordine/')

    this.ordineList.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
        	  let idRistorante = snapshot.$key
          	let item = snapshot
            console.log(idRistorante)
            console.log(item)
            let comanda = {}
            comanda['pronto'] = false
            comanda['idCliente'] = this.idCliente
            comanda['data'] = data
            comanda['ordine'] = item

            this.af.database.object('/comande/'+idRistorante+'/'+this.idOrdine).set(comanda)

            //this.af.database.object('/comande/'+item.idRistorante+'/'+this.idCliente+'/'+ordineKey).set(comanda)
        });
    })
    
    let loader = this.loadingCtrl.create({
    content: "Attendere l'esito della transazione..."
    });
    loader.present();
    setTimeout(() => {
             loader.dismissAll()
    }, 2000);

    this.af.database.list('/carrello/').remove(this.user.id)

    this.navCtrl.setRoot(OrdListPage)
  }

}
 