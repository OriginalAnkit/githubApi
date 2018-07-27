import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class appService {
    url = "http://localhost:3000";
    flash={
        msg:"",
        show:false
    }
    constructor(private http: Http, private router: Router) { }

    registerUser(form: any) {
        // console.log("hello")
        this.http.post(this.url + "/user/register", form).subscribe(
            (res: any) => {
                console.log(res);
                var body = JSON.parse(res._body);
                if (body.success) {
                    this.router.navigate(["/login"]);
                } else if (body.emailError) {
                    alert("email should be unique");
                } else {
                    alert("user not registered");
                }
            }
        )
    }

    public login(data: any) {
        this.http.post(this.url + "/user/login", data).subscribe(
            (res: any) => {
                console.log( res._body);
                if (res._body!="wrong Password"&&res._body!="No user Found") {
                    localStorage.setItem("s-auth", res._body);
                     this.showFlash(true,"Logged in Successfully");
                    this.router.navigate([""]);
                }else{
                    console.log("wrong password")
                }

            }
        )
    }
   
    showFlash(show,msg){
        this.flash.msg=msg;
        this.flash.show=show;
        setTimeout(() => {
            this.flash.show=false;
        }, 1500);
    }

}