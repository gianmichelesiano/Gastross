import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RistListPage} from '../rist-list/rist-list'
import { AngularFire  } from 'angularfire2';
import { LoginPage } from '../login/login'
import { User, Auth } from '@ionic/cloud-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor( public user: User, private auth:Auth, public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {


    if(!this.auth.isAuthenticated()) {
        this.navCtrl.setRoot(LoginPage)
    }
    this.af.database.list('/carrello/').remove(this.user.id)

 

  }

  ordina(){
  	this.navCtrl.push(RistListPage);
  }
}
