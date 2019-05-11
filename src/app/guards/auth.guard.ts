import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {tap,map,take} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../servicios/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afauth:AngularFireAuth,
    private router:Router,
    private authService:AuthService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.afAuth.authState
    .pipe(take(1))
    .pipe(map(authState => !!authState))
    .pipe(tap(authenticated =>{
      if(!authenticated){
        this.router.navigate(['/login']);
      }
    }));
  }
  
  
}
