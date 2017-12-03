import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private _router: Router, private _http: Http) {
  }

  obtainAccessToken(loginData) : Promise<boolean>{

    let params = new URLSearchParams();
    params.append('username',loginData.username);
    params.append('password',loginData.password);
    params.append('grant_type','password');
    params.append('client_id','client');

    let headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa("client:secret")
    });

    let options = new RequestOptions({
      headers: headers
    });

    return new Promise<boolean>(resolve => {
      this._http.post('http://localhost:8081/oauth/token', params.toString(), options)
        .subscribe(data =>  {
          this.saveToken(data.json());
          resolve(true);
        }, error => {
          alert('Invalid Credentials');
          console.log('Error : ' + error);
          resolve(false);
        })
    });
  }

  saveToken(data): void{
    const access_token = data['access_token'];
    localStorage.setItem("access_token", access_token);

    console.log('Token saved : ' + access_token);
  }

  getResource(resourceUrl) : Promise<string>{
    var headers = new Headers(
      {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer '+localStorage.getItem('access_token')
      });
    var options = new RequestOptions({ headers: headers });

    return new Promise<string>(resolve => {
      this._http.get(resourceUrl, options).subscribe(
        response => {
          console.log('API response : ' + response);
          resolve(response.text());
      }, error => resolve(null));
    });
  }

  checkCredentials(){
    if (localStorage.getItem('access_token') == null){
      this._router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this._router.navigate(['/login']);
  }
}

