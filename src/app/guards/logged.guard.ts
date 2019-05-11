import { Injectable } from '@angular/core';
import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {tap,map,take} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../servicios/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(
    private afauth:AngularFireAuth,
    private router:Router,
    private authService:AuthService
  ){}
  
  canActivate(): Observable<boolean> {
    return this.authService.afAuth.authState
      .pipe(
        take(1),
        map(authState => {
          if (authState) {
            this.router.navigate(['/dashboard']);
          }
          return true;
        }));
  }
  
}
