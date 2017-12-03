import { Component} from '@angular/core';
import {LoginService} from '../service/login.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {
  public loginData = {username: "", password: ""};

  constructor(private _service:LoginService, private _router: Router) {

  }

  login() {
    this._service.obtainAccessToken(this.loginData).then(
      result => {
        console.log('Logging result : ' + result);
        if(result){
          this._router.navigate(['/']);
        }
      }, error => {
        console.log('Token not obtained - an error has occurred');
        console.log('Error = ' + error);
      }
    );
  }
}
