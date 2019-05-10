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
    this.currentuser = this.authService.doSomething();
    if (this.currentuser != null) {
      this.isLogin=true;
      
      console.log(this.currentuser +""+ this.isLogin);
      
    }else{
      this.isLogin=false;
    }

  }
  onClickLogOut() {
    this.isLogin=false;
    this.authService.logout();
    this.router.navigate(["/login"]);

  }

}
