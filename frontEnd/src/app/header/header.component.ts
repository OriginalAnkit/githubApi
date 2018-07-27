import { Component, OnInit } from '@angular/core';
import { appService } from '../services/appService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public appSer:appService) { }
  loggedIn:boolean;
  ngOnInit() {
    this.loggedIn=localStorage.getItem("s-auth")?true:false;
  }

}
