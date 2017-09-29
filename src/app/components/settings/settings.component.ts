import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Settings} from '../../models/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:Settings;

  constructor(
    public settingService:SettingsService,
    public flashMessages:FlashMessagesService,
    public router:Router
  ) { }

  ngOnInit() {
    this.settings=this.settingService.getSettings();
  }

  onSubmit(){
    this.settingService.changeSettings(this.settings);
    this.flashMessages.show("Settings Saved",{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/settings']);
  }

}
