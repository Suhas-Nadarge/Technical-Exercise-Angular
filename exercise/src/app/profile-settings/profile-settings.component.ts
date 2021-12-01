import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from '../constant';
import { IProfile, ProfileService } from '../profile.service';
import {FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {


  languageList = Languages 
  user!: IProfile;
  profileForm!: FormGroup;
  isError = false;
  isSave = false;
  isRetry = false;
  isUpdate = false;
  isLoad = false;
  emailError = false;
  ngOnInit(): void {
  this.createForm();
  this.getProfileInfo();
  }
  

  constructor (private profileservice: ProfileService, private translate: TranslateService,private fb:FormBuilder) { 
   
    // set default language as English
    this.translate.use('en');
  }

  // create formGroup for profile
  createForm() {
    this.profileForm = this.fb.group({
      fname: '',
      lname: '',
    });
  }


// method to get profile data
   async getProfileInfo() {
    this.isSave = false;
    this.isUpdate= false;
    this.isLoad = true;

    await this.profileservice.getProfileUser().then(el=>{
    if(el){
      this.isRetry = false;
      this.isError = false;
      this.isLoad = false;

      console.log(el)
      this.user =el;
      this.profileForm.get('fname')?.setValue(this.user.firstName);
      this.profileForm.get('lname')?.setValue(this.user.lastName);
    }
    }).catch((err) => { 
      this.isError = true;
      //Retrying promise recursively while fetching profile data
      this.isRetry= true;
      this.getProfileInfo();
      console.log(err);
  });
  }



// method to update existing profile data  
async saveProfile() {
this.isSave = true;
this.isLoad = true;
this.isUpdate = false;
console.log(this.profileForm.value)
const profileObj = this.profileForm.value;
    await this.profileservice.setName(profileObj['fname'],profileObj['lname']).then(el =>{
    if(el){
      this.emailError = false;
      this.isLoad = false;
      this.isRetry = false;
      console.log(el)
      this.user = el;
      this.profileForm.get('fname')?.setValue(this.user.firstName);
      this.profileForm.get('lname')?.setValue(this.user.lastName);
      this.isUpdate= true;
    }
    }).catch((err) => { 
      this.emailError = true;
      // reset the old values for firstName and lastName
      this.profileForm.get('fname')?.setValue(this.user.firstName);
      this.profileForm.get('lname')?.setValue(this.user.lastName);
      this.isRetry= true;
      this.emailError= true;
      console.log(err);
  });
}


// Update language for localisation
setLanguage(e:any): void{
  this.isSave = false;
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
      
    default:
      break;
  }
}


}









