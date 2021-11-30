import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from '../constant';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  ngOnInit(): void {

  }
// title = 'Profile';
languageList = Languages 

// public user: IProfile;
// constructor()
  constructor (private profile: ProfileService, private translate: TranslateService) { 
    this.translate.use('en');
  }

  setLanguage(e:any): void{
    let key = e.target.value;
    switch (key) {
      case 'en':
        this.translate.use('en');
        break;
      case 'fr':
        this.translate.use('fr');
        break;
      case 'gr':
        this.translate.use('de');
        break;
      case 'sp':
        this.translate.use('es'); 
        break;   
        
        break;
    
      default:
        break;
    }
  }

saveProfile() {

}


}









