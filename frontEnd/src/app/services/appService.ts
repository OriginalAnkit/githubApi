import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class appService {
    url="http://localhost:3000"
    constructor(private http: Http,private router:Router) { }

    registerUser(form:any) {
        // console.log("hello")
        this.http.post(this.url+"/user/register",form).subscribe(
            (res:any)=>{
                console.log(res);
                var body=JSON.parse(res._body);
                if(body.success){
                 this.router.navigate(["/login"]);
                }else if(body.emailError){ 
                    alert("email should be unique");
                }else{
                    alert("user not registered");
                }
            }
        )
    }
}