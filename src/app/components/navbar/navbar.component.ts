import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogin: boolean;
  public nombreuser: string;
  public email: string;
  public currentuser: Object;
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    /** Cuando iniciamos sesion, se setea un item en Session Storage (volatil al cerrar el browser), si ese elemento existe, ya no hace comprobacion a firebase
    si no lo encuentra, procede a verificar con firebase si estamos logueados
    */
    if (sessionStorage.getItem("auth") == "ok") {

      this.isLogin = true;

    } else {
      //se conecta al metodo de "check login " de nuestro Auth Service, una vez terminado .then va a recibir un usuario de firebase llamado auth el cual leemos
      //si es nulo, quiere decir que no hay usuario loggueado, si no es nulo, nos devuelve un objeto de firebase
      this.authService.doSomething().then((auth) => {

        if (auth) {
          sessionStorage.setItem("auth", "ok");
        }
        if (auth == null) {
          this.isLogin = false
        } else {
          this.isLogin = true;
          this.nombreuser = auth.displayName;
          this.email = auth.email;
        }

      })

    }


  }
  onClickLogOut() {
    this.isLogin = null;
    this.authService.logout().then(() => {
      sessionStorage.removeItem("auth");
      this.router.navigate(['']);
    });


  }

}
