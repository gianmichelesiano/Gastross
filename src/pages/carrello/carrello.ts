import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import { User } from '@ionic/cloud-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase'



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
  ordineList : Observable<Ordine[]>;
  oggettoTotale: FirebaseObjectObservable<any>;

  constructor(public user: User, public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
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
            console.log(result);
            return result;
        })
    );


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

}
