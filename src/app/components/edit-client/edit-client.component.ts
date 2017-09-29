import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router, ActivatedRoute,Params} from '@angular/router';
import {Client} from '../../models/Client'; 
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client:Client={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }
  disableBalanceOnEdit:boolean=true;

  constructor(
    public clientservice:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessages:FlashMessagesService,
    public settingsservice:SettingsService
  ) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    //get Client
    this.clientservice.getClient(this.id).subscribe(client=>{
      this.client=client;
  });
  this.disableBalanceOnEdit=this.settingsservice.getSettings().disableBalanceOnEdit;
}

onSubmit({value,valid}:{value:Client,valid:boolean}){
  if(!valid){
    this.flashMessages.show('Please fill all Fields',{cssClass:'alert-danger',timeout:2000});
    this.router.navigate(['edit-client/'+this.id]);
  } else{
    //Update the Client
    this.clientservice.updateClient(this.id,value);
    this.flashMessages.show('Client Updated',{cssClass:'alert-success',timeout:2000});
    this.router.navigate(['/client/'+this.id]);
  }
}

}
