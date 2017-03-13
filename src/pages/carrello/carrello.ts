import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import { User } from '@ionic/cloud-angular';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import * as firebase from 'firebase'

import {RistListPage} from '../rist-list/rist-list'
import {HelloIonicPage} from '../hello-ionic/hello-ionic'
import {OrdListPage} from '../ord-list/ord-list'





interface Ordine {
    $key?: string;
    key:string;
    nomePiatto:string;
    quantity:string;
    prezzo:string;
    downloadURL?: string;
    path: string;  
}

@Component({
  selector: 'page-carrello',
  templateUrl: 'carrello.html'
})
export class CarrelloPage {
	item:any
	quantity:number
	loading: boolean = true
	total:number=0

  carrello: FirebaseListObservable<any>;
  carrelloObject: FirebaseListObservable<any>;
  
  ordini: FirebaseListObservable<any>;
  ordineList : Observable<Ordine[]>;
  cartTotal: Observable<any>;
  oggettoTotale: FirebaseObjectObservable<any>;
  totaleFin:Observable<number>


  constructor(public alertCtrl: AlertController, public user: User, public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
		let storage = firebase.storage();
		this.carrello = this.af.database.list('/carrello/'+this.user.id);


		this.ordineList = this.carrello.map( itemList =>
        itemList.map( item => {

            var pathReference = storage.ref(item.path);
            let result = {$key: item.$key, 
            			  downloadURL: pathReference.getDownloadURL(), 
            			  path: item.path, 
            			  nomePiatto: item.nomePiatto, 
            			  quantity: item.quantity, 
            			  prezzo: item.prezzo};
            console.log("result");
            console.log(result);
            return result;
        })
    );





    this.cartTotal = this.carrello.map( itemList =>
        itemList.map( item => {
            let result = {
                    totale: item.prezzo*item.quantity
                    };
            return result;
        })
    );

    this.totaleFin = this.cartTotal
                .map(arr => arr.reduce((a, b) => a + b.totale, 0));


    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrelloPage');
  }

  onLoad() {
    this.loading = false;
  }

  deletePiatto(key: string) {    
    this.carrello.remove(key); 
  }

  aggiungi() {    
    this.navCtrl.push(RistListPage);
    console.log('aggiungi');  
  }

  svuota(){
   this.af.database.list('/carrello/').remove(this.user.id)
   let alert = this.alertCtrl.create({
      title: 'Carrello svuotato!',
      subTitle: 'Puoi eseguire un nuovo ordine!',
      buttons: ['OK']
    });
   alert.present();
   this.navCtrl.push(HelloIonicPage);
  }

  ordina(radioValue) {
    //this.navCtrl.push(RistListPage);    
    console.log(radioValue);
    if (typeof radioValue == 'undefined') {
           let alert = this.alertCtrl.create({
            title: 'Aggiungi un metodo di pagamento!',
            subTitle: 'Per favore scelga tra uno disponibile!',
            buttons: ['OK']
          });
          alert.present(); 
     } 

     if (radioValue == 'contanti'){
         //this.navCtrl.push(OrdListPage);

         var data = Math.floor(Date.now() / 1000)
  
         let pronto = 0;
         let consegnato = 0;

         // inizia lo staorege dell'ordine
         this.af.database.list('/ordini/').push({
                                               idCliente:this.user.id,
                                               pronto:pronto,
                                               consegnato: consegnato,
                                               data:data
          }).then((ordine) => { 

         this.ordineList = this.carrello.map( itemList =>
              itemList.map( item => {
                  let result = {
                          idPiatto:item.$key,
                          idRistorante:item.idRistorante,
                          path: item.path, 
                          nomePiatto: item.nomePiatto, 
                          quantity: item.quantity, 
                          prezzo: item.prezzo,


                  };
                  this.af.database.list('/ordini/'+ordine.key+'/ordine').push(result)
                  console.log("dsfds");
                  console.log(result);

                  let comanda = {
                          idPiatto:item.$key,
                          idCliente:this.user.id,
                          idOrdine:ordine.key,
                          path: item.path, 
                          nomePiatto: item.nomePiatto, 
                          quantity: item.quantity, 
                          data: data,
                          pronto:pronto,
                          consegnato: consegnato,
                          prezzo: item.prezzo,
                  };
                  this.af.database.list('/comande/'+item.idRistorante).push(comanda)
                  

                  return result;
              })
          )

          });
          
         //this.navCtrl.setRoot(OrdListPage); 
     }

     //this.af.database.list('/carrello/').remove(this.user.id)
     //this.navCtrl.setRoot(OrdListPage); 
     
      

  }



}
