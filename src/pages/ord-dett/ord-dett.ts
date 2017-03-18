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
    let storage = firebase.storage();
  	
    this.ordine = navParams.get('ordine')
    this.idOrdine = navParams.get('idOrdine')


    this.listaordineDettaglio = this.af.database.list('ordini/'+this.user.id+'/'+this.idOrdine+'/ordine', {preserveSnapshot:true})


    this.listaordineDettaglio.subscribe(snapshots => {
                 snapshots.forEach(snapshot => {
                        let chiave = snapshot.key
                        let valore = snapshot.val()

                        let listaPiatti = []
                        for (let k in valore){
                          listaPiatti.push(valore[k])
                        }



this.oggettoRistorante = this.af.database.object('ristoranti/'+chiave, {preserveSnapshot:true})
this.oggettoRistorante.subscribe( elemn => {
  console.log(elemn.val()['nome'])
  let nomeRist = elemn.val()['nome']
  this.listaTutti.push({nomeRist:nomeRist, chiave:chiave, listaPiatti:listaPiatti})
})
                        

                      
                    })
 
               })







    


  	//this.ordineDettaglio = this.af.database.list('ordini/'+this.user.id+'/'+this.key+'/ordine')
    
/*    this.ordineDettaglioConFoto = this.ordineDettaglio.map( itemList =>
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
    );*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdDettPage');
  }

  onLoad() {
    this.loading = false;
  }

} 
