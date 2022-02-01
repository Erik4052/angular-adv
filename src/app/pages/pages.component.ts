import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
declare function customInitFunctions():void;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
 
  constructor(private settinsService:SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
    /* const url = `./assets/css/colors/${theme}.css`; */
    //./assets/css/colors/default-dark.css
  }

}
