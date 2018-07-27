import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { appService } from '../services/appService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appSer:appService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.appSer.login(f.form.value)
    f.reset();
  }

}
