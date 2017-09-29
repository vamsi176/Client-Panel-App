import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import 'rxjs/add/operator/map';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessages:FlashMessagesService,
    public settingsservice:SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth()
    .subscribe(auth =>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else{
        this.isLoggedIn=false;
      }
    });

    this.showRegister=this.settingsservice.getSettings().allowRegistration;
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessages.show("You are Logged out",{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/login']);
  }
}
