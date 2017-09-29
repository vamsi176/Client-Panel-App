import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;

  constructor(
    private authservice:AuthService,
    private router:Router,
    private flashMessages:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authservice.login(this.email,this.password)
    .then((res)=>{
      this.flashMessages.show('You are Logged in',{cssClass:'alert-success',timeout:2000});
      this.router.navigate(['/']);
    })
    .catch((err)=>{
      this.flashMessages.show(err.message,{cssClass:'alert-danger',timeout:2000});
      this.router.navigate(['/login']);
    });
  }

}
