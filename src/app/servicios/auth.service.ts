import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {map,first} from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData)),
        err => reject(err);
    })
  }


  loginUser(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userData=>resolve(userData)),
      err=>reject(err);
    })
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
 }
 async doSomething() {
  const user = await this.isLoggedIn()
  if (user) {
    
    return user;
    // do something
  } else {
    return null;
    // do something else
 }
}
 

  logout() {
    return this.afAuth.auth.signOut();
  }
}
