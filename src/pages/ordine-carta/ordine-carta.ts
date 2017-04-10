import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import { User } from '@ionic/cloud-angular';
import {GeocodingService} from '../../gmapsservice.service'

import {OrdListPage} from '../ord-list/ord-list'

/*
  Generated class for the OrdineCarta page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ordine-carta',
  templateUrl: 'ordine-carta.html',
  providers:[GeocodingService]
})
export class OrdineCartaPage {

  totale: string
  idCliente: string
  idOrdine: string
  data: string
  pagamento: string

  informazioni : FirebaseObjectObservable<any>;
  ordine : FirebaseObjectObservable<any>;
  ordineList : FirebaseListObservable<any>;
  dataPagamento:any

  constructor(private geocoder:GeocodingService, private toastCtrl: ToastController, public loadingCtrl:LoadingController, public user: User, public af:AngularFire, public navCtrl: NavController, public navParams: NavParams) {


    this.totale = navParams.get('totale')
    this.idCliente = navParams.get('idCliente')
    this.idOrdine = navParams.get('idOrdine')
    this.data = navParams.get('data')
    this.pagamento = navParams.get('pagamento')
    this.dataPagamento = Math.floor(Date.now() / 1000)
    console.log('--------------')
    console.log(this.pagamento)

    this.informazioni = this.af.database.object('clienti/'+this.idCliente+'/datiPersonali/');



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdineCartaPage');
  }

  pagaOrdine(indirizzo){

    
  	this.ordine = this.af.database.object('ordini/'+this.idOrdine);
  	//this.ordine.update({indirizzoSpedizione:indirizzo, pagato:true})

    if (indirizzo != ''){
      this.updateIndirizzoPagato(indirizzo)
    } else {
      console.log("inserire indirizzo")
      let toast = this.toastCtrl.create({
          message: 'Inserire un indirizzo',
          duration: 2000,
          position: 'down'
      });
      toast.present();

    }

  }

  updateIndirizzoPagato(indirizzo){
      this.geocoder.getCoordinate(indirizzo).subscribe(result => {
            let latitude = result.results[0].geometry.location.lat;
            let longitude = result.results[0].geometry.location.lng;
            console.log(latitude)
            console.log(longitude)
            this.ordine.update({indirizzoSpedizione:indirizzo, pagato:true, lat:latitude, lon:longitude})
            
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

/*  creaOrdine(){
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
            comanda['data'] = this.dataPagamento
            comanda['ordine'] = item

            this.af.database.object('/comande/'+idRistorante+'/'+this.idOrdine).set(comanda)
        });
    }).unsubscribe()
  }*/

}
 