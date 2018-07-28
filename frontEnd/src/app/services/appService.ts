import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class appService {
    url = "http://localhost:3000";
    repos: any[];
    loggedIn: boolean;
    flash = {
        msg: "",
        show: false
    }
    constructor(private http: Http, private router: Router) { }
    //==============REGISTER USER=================
    registerUser(form: any) {
        // console.log("hello")
        this.http.post(this.url + "/user/register", form).subscribe(
            (res: any) => {
                console.log(res);
                var body = JSON.parse(res._body);
                if (body.success) {
                    this.router.navigate(["/login"]);
                } else if (body.emailError) {
                    this.showFlash(true, "You are already registered");
                } else {
                    this.showFlash(true, "User not Registered ");
                }
            }
        )
    }

    //=================LOGIN USER=================
    public login(data: any) {
        this.http.post(this.url + "/user/login", data).subscribe(
            (res: any) => {
                console.log(res._body);
                if (res._body != "wrong Password" && res._body != "No user Found") {
                    localStorage.setItem("s-auth", res._body);
                    this.loggedIn = true;
                    this.showFlash(true, "Logged in Successfully");
                    this.router.navigate(["/search"]);
                } else {
                    // console.log("wrong password")
                    this.showFlash(true, "Wrong Password or Email!");
                }

            }
        )
    }

    //===================LOGOUT===================
    public logout() {
        localStorage.clear();
        this.showFlash(true, "Logout Successfully")
        this.router.navigate(['/login'])
    }

    //====================  SEARCHING============
    public searchRepo(data: any) {
        if (data.order == 'order' || data.sort == 'sort') {
            data.order = null,
                data.sort = null
        }

        // console.log(headers);
        this.http.post(this.url + "/user/search", data, { headers: this.head() }).subscribe(
            (res: any) => {
                if (res._body == `{"error":"unauthorizrd"}`) {
                    localStorage.clear();
                    this.showFlash(true, "UnAuthorized");
                    this.loggedIn = false;
                    this.router.navigate(["/login"]);
                } else {
                    this.repos = JSON.parse(res._body).items
                    console.log(JSON.parse(res._body).items);
                }
            }
        )
    }

    // ============getOne repo==================
    oneRepo(num) {
        return this.repos[num];
    }

    // ===============recent search================
    getSearch(){
       return this.http.get(this.url+"/user/recentsearch",{headers:this.head()})
    }

    //============headers==================
    head() {
        let headers = new Headers();
        headers.append('s-auth', localStorage.getItem("s-auth"));
        return headers;
    }

    //=================flash==================
    showFlash(show, msg) {
        this.flash.msg = msg;
        this.flash.show = show;
        setTimeout(() => {
            this.flash.show = false;
        }, 1500);
    }

}