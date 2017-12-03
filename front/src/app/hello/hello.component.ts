import { Component, OnInit } from '@angular/core';
import { LoginService} from "../service/login.service";

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
  providers: [LoginService]
})
export class HelloComponent implements OnInit {

  private resourceServerUrl = 'http://localhost:8081/api/hello';
  private userDetailsUrl = 'http://localhost:8081/api/me';
  private message: string;
  private details: string;

  constructor(private _service:LoginService) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this._service.getResource(this.userDetailsUrl).then(
      data => {
        this.details = data;
      },
      error => {
        console.log(error);
        this.details = '';
      }
    );
  }

  getMessage(){
    this._service.getResource(this.resourceServerUrl).then(
      data => {
        this.message = data;
      },
      error => {
        console.log(error);
        this.message = '';
      }
    );
  }

}
