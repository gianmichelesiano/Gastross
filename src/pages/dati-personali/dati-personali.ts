import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable  } from 'angularfire2';
import { User } from '@ionic/cloud-angular';



/*
  Generated class for the DatiPersonali page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dati-personali',
  templateUrl: 'dati-personali.html'
})
export class DatiPersonaliPage {
 

  impostazioniSnap: FirebaseObjectObservable<any>;
  locVar:any;
  nome :string
  cognome :string
  indirizzo :string
  cap :string
  dataNascita :string
  sesso :string
  constructor( public loadingCtrl:LoadingController, private toastCtrl: ToastController, public user: User, public af: AngularFire,public navCtrl: NavController, public navParams: NavParams) {

  	this.impostazioniSnap = af.database.object('/clienti/'+this.user.id+'/datiPersonali', { preserveSnapshot: true });
    let loader = this.loadingCtrl.create({
    content: "Sto caricando le preferenze..."
    });
    loader.present();
    this.impostazioniSnap.subscribe(snapshot => {

    		this.locVar = snapshot.val();
    		if (this.locVar ==null) {
    			this.nome = '';
    			this.cognome = '';
    			this.indirizzo = '';
    			this.cap = '';
    			this.dataNascita = '';
    			this.sesso = '';

    		} else {
    			this.nome = this.locVar['nome'];
    			this.cognome = this.locVar['cognome'];
    			this.indirizzo = this.locVar['indirizzo'];
    			this.cap = this.locVar['cap'];
    			this.dataNascita = this.locVar['dataNascita'];
    			this.sesso = this.locVar['sesso'];
  			}
  			loader.dismissAll();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImpostazioniPage');
  }

  salvaImpostazioni(nome, cognome, indirizzo, cap, dataNascita, sesso){
  	
  	console.log(nome, cognome, indirizzo, cap, dataNascita, sesso)
  	this.impostazioniSnap.set({ 
  						nome: nome,
  						cognome: cognome,
  						indirizzo: indirizzo,
  						cap: cap,
  						dataNascita: dataNascita,
  						sesso: sesso,
  					});
	let toast = this.toastCtrl.create({
    message: 'Preferenze Salvate',
    duration: 2000,
    position: 'down'
	    });
    toast.present();
  }


}
