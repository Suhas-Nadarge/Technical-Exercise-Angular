import { Injectable } from "@angular/core";



export interface IProfile {
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  email?:string
}


@Injectable({ providedIn: 'root' })
export class ProfileService {
  user!: IProfile;
  constructor() { }

  // get user profile data
  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            email:'michael.collins@blueface.com',
            age: 30
          };
          resolve(this.user);
        } else {
          reject({ error: "Profile not found" });
        }
      }
        , Math.random() * 5000);
    });
  }

// update name of user
  setName(firstName: string,lastName:string):Promise<IProfile>  {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user['firstName'] = firstName;
          this.user['lastName'] = lastName;
          this.user['username']= firstName+'.'+lastName;
          resolve(this.setUserEmail(firstName,lastName));
        } else {
          reject({ error: 'Invalid name' });
        }
      },
        Math.random() * 5000);
    });
  }

  // generate user email based on firstName and lastName
  setUserEmail(firstName: string, lastName: string): IProfile {
    this.user['email'] = firstName+'.'+lastName+'@blueface.com';
    this.user['email'] = this.user['email'].split(" ").join("");
    return this.user;
  }
}