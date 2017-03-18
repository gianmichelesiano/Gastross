import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import { User } from '@ionic/cloud-angular';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import * as firebase from 'firebase'

import {RistListPage} from '../rist-list/rist-list'
import {HelloIonicPage} from '../hello-ionic/hello-ionic'
//import {OrdListPage} from '../ord-list/ord-list'

import { OrdineContantiPage } from '../ordine-contanti/ordine-contanti';
import { OrdineCartaPage } from '../ordine-carta/ordine-carta';


interface Ordine {
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
    pronto: string; 
}


@Component({
  selector: 'page-carrello',
  templateUrl: 'carrello.html'
})
export class CarrelloPage {

  carrelloPieno: boolean = false
  item:any
  quantity:number
  loading: boolean = true
  total:number=0
  carrello: FirebaseListObservable<any>;
  carrelloObject: FirebaseListObservable<any>;
  ordini: FirebaseListObservable<any>;

  carrelloSnap: FirebaseObjectObservable<any>;

  ordineListPaga : Observable<Ordine[]>;
  ordineList : Observable<Ordine[]>;
  cartTotal: Observable<any>;
  oggettoTotale: FirebaseObjectObservable<any>;
  totaleFin:Observable<number>


  totale : number = 0
  constructor(public alertCtrl: AlertController, public user: User, public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
    let storage = firebase.storage();
    this.carrello = this.af.database.list('/carrello/'+this.user.id);


    this.ordineList = this.carrello.map( itemList =>
        itemList.map( item => {
            this.carrelloPieno = true
            var pathReference = storage.ref(item.path);
            let result = {
                    $key: item.$key, 
                    downloadURL: pathReference.getDownloadURL(), 
                    path: item.path, 
                    nomePiatto: item.nomePiatto, 
                    quantity: item.quantity, 
                    prezzo: item.prezzo,
                    nomeRistorante: item.nomeRistorante,
                    inOfferta: item.inOfferta,
                    prezzoOfferta: item.prezzoOfferta,
                    pronto:false
                  };
            return result;
        })
    );


    
    //Calcolo Totale
    this.totale = 0
    this.carrelloSnap = null 
    this.carrelloSnap = af.database.object('/carrello/'+this.user.id, { preserveSnapshot: true });
    this.carrelloSnap.subscribe(snapshot => {
        let listaPiatti = snapshot.val()
        for (var key in listaPiatti) {
            let quantity = listaPiatti[key]['quantity']
            let prezzo = listaPiatti[key]['prezzo']
            let inOfferta = listaPiatti[key]['inOfferta']
            if (inOfferta) {
              prezzo = listaPiatti[key]['prezzoOfferta']
            }
            this.totale = this.totale +quantity*prezzo
        }
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrelloPage');
  }

  onLoad() {
    this.loading = false;
  }

  deletePiatto(key: string) { 
    this.totale = 0   
    this.carrello.remove(key); 
  }

  aggiungi() {
    this.navCtrl.setRoot(RistListPage)
  }

  svuota(){
   this.af.database.list('/carrello/').remove(this.user.id)
   let alert = this.alertCtrl.create({
      title: 'Carrello svuotato!',
      subTitle: 'Puoi eseguire un nuovo ordine!',
      buttons: ['OK']
    });
   alert.present();
   this.navCtrl.setRoot(HelloIonicPage)
  }

  ordina(radioValue, totale) {
     console.log(totale)
     if (radioValue == 'contanti'){
            this.creaOrdine(OrdineContantiPage, totale)
      } else if (radioValue == 'carta'){
            this.creaOrdine(OrdineCartaPage, totale)
      } else {
          let alert = this.alertCtrl.create({
            title: 'Aggiungi un metodo di pagamento!',
            subTitle: 'Per favore scelga tra uno disponibile!',
            buttons: ['OK']
          });
          alert.present(); 
      }
  }



  creaOrdine(Page, totale){
         let idOrdine = ''
         var data = Math.floor(Date.now() / 1000)
         let pagato = false;
         let stato = 0;

         // inizia lo staorege dell'ordine
         this.af.database.list('/ordini/'+this.user.id).push({
                                               stato:stato,
                                               data:data,
                                               totale:totale,
                                               pagato:pagato
                          
          }).then((ordine) => {
               this.carrello.subscribe(snapshots => {
                    snapshots.forEach(snapshot => {
                        let chiave = snapshot.$key
                        let valore = snapshot
                        let idRistorante = valore['idRistorante']
                       
                        console.log(valore)
                        console.log(idRistorante)

                        //let idRistorante = valore['idRistorante']

                        this.af.database.object('/ordini/'+this.user.id+'/'+ordine.key+'/ordine/'+idRistorante+'/'+chiave).set(valore)
                    })
               }).unsubscribe()
               this.navCtrl.push(Page, {totale:totale, idCliente:this.user.id, idOrdine:ordine.key, data:data});     
          })
  }




}

