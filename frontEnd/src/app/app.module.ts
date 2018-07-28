import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { appService } from './services/appService';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SearchComponent } from './search/search.component';
import { AuthService } from './services/authService';

const appRoutes:Routes=[
  {path:"",component:DashbordComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"search",component:SearchComponent,canActivate:[AuthService]},
  {path:"**",redirectTo:"login"}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    DashbordComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [appService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
