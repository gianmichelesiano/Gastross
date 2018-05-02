import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
//import { Page1 } from '../page1/page1'
import { HelloIonicPage } from '../hello-ionic/hello-ionic'
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
/*

  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public fireAuth: any;
  showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';

  constructor(public storage: Storage, public navCtrl: NavController, public auth:Auth, public user: User, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
    this.fireAuth = firebase.auth();
    storage.get('email').then((val) => {
        this.email = val
        console.log('Your email', val);
     });

     storage.get('password').then((val) => {
        this.password = val
        console.log('Your password', val);
     });    
  }

  ionViewDidLoad() {
    this.storage.get('email').then((val) => {
       this.email = val
        console.log('Email', val);
          this.storage.get('password').then((val) => {
          this.password = val
          console.log('Dentro password', val);
          if (this.email != null && this.password != null) {
            this.fireAuth.signInWithEmailAndPassword(this.email, this.password).then(() => {
              console.log('LOGIN iNTERNAL');
              this.navCtrl.setRoot(HelloIonicPage); 
              //this.navCtrl.setRoot(Page1);            
            });
          }
        });
     });
  }

  /*
  for both of these, if the right form is showing, process the form,
  otherwise show it
  */
  doLogin() {
    if(this.showLogin) {
      console.log('process login');

      if(this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Errore di registrazione', 
          subTitle:'Tutti i campi sono obbligatori',
          buttons:['OK']
        });
        alert.present();
        return;
      }     

      let loader = this.loadingCtrl.create({
        content: "Autenticazione..."
      });
      loader.present();

      // LOGIN
      
      //this.auth.login('basic', {'email':this.email, 'password':this.password}).then(() => {
      this.fireAuth.signInWithEmailAndPassword(this.email, this.password).then(() => {
        console.log('ok i guess?');

        this.storage.set('email', this.email);
        this.storage.set('password', this.password);
        loader.dismissAll();
        
        this.navCtrl.setRoot(HelloIonicPage); 
        //this.navCtrl.setRoot(Page1);            
      }, (err) => {
        loader.dismissAll();
        console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email non valida.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Password obbligatoria.<br/>';

        let alert = this.alertCtrl.create({
          title:'Errore di login', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
    } else {
      this.showLogin = true;
    }
  }

  doRegister() {
    if(!this.showLogin) {
      console.log('process register');

      /*
      do our own initial validation
      */
      if(this.name === '' || this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Errore di registrazione', 
          subTitle:'Tutti i campi sono obbligatori',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name};
      console.log(details);
      
      let loader = this.loadingCtrl.create({
        content: "Registrazione del tuo account..."
      });
      loader.present();

      // REGISTER

     
      //this.auth.signup(details).then(() => {
       this.fireAuth.createUserWithEmailAndPassword(this.email, this.password).then(() => {
        console.log('ok signup');
        //this.fireAuth.signInWithEmailAndPassword(this.email, this.password).then(() => {
        //this.auth.login('basic', {'email':details.email, 'password':details.password}).then(() => {
        //this.nativeStorage.setItem('cred', {email: this.email, password: this.password}) 
        this.storage.set('email', this.email);
        this.storage.set('password', this.password);
        this.fireAuth.signInWithEmailAndPassword(this.email, this.password).then(() => {  
          loader.dismissAll();
          this.navCtrl.setRoot(HelloIonicPage);
        });

      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_email') errors += 'Email obbligatoria.<br/>';
          if(e === 'required_password') errors += 'Password obbligatoria.<br/>';
          if(e === 'conflict_email') errors += 'Un utente con questa mail è già presente.<br/>';
          //don't need to worry about conflict_username
          if(e === 'invalid_email') errors += 'Indirizzo mail non valido.';
        }
        let alert = this.alertCtrl.create({
          title:'Errore di registrazione', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
     
    } else {
      this.showLogin = false;
    }
  }

  forgotPassword(){
    console.log('das')
    //this.navCtrl.setRoot(ResetPasswordPagePage);
  }
}