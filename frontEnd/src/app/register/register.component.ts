import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { appService } from '../services/appService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private appSer:appService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    // console.log(f.form);
    this.appSer.registerUser(f.form.value);
  }

}
