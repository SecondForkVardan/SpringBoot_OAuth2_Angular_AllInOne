import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-home',
  providers: [LoginService],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private _service: LoginService){}

  ngOnInit(){
    this._service.checkCredentials();
  }

  logout() {
    this._service.logout();
  }
}
