import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {Client} from '../../models/Client';
import {ClientService} from '../../services/client.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }

  disableBalanceOnAdd:boolean=false;

  constructor(
    public fmsgService:FlashMessagesService,
    public router:Router,
    public clientservice:ClientService,
    public settingsservice:SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd=this.settingsservice.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value,valid}:{value:Client,valid:boolean}){
    if(this.disableBalanceOnAdd){
      value.balance=0;
    }
    if(!valid){
      this.fmsgService.show('Please fill all Fields',{cssClass:'alert-danger',timeout:2000});
      this.router.navigate(['add-client']);
    } else{
      //Add New Client
      this.clientservice.newClient(value);
      this.fmsgService.show('New Client Added',{cssClass:'alert-success',timeout:2000});
      this.router.navigate(['/']);
    }
  }

}
