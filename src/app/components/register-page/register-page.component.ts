import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(
    public flashMessage: FlashMessagesService,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  onSubmitAddUser() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.flashMessage.show("Cuenta Creada con Exito!", { cssClass: 'alert-success', timeout: 4000 })
        this.router.navigate(["private"]);
      }).catch((err) => {
        this.flashMessage.show(err.message,{cssClass:'alert-danger',timeout:4000})
        this.router.navigate(["/register"])
      })

  }


}
