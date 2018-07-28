import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { appService } from "./appService";


@Injectable()
export class AuthService implements CanActivate {



    constructor(private router: Router, private appSer: appService) { }

    canActivate() {
        if (localStorage.getItem("s-auth") === null) {
            this.appSer.showFlash(true,"You have to login first");
            this.router.navigate(['login']);
            return false;
        } else {

            return true;
        }
    }
}