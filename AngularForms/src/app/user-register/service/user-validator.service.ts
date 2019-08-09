import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorService {

  constructor() { }

  public validateDOB(ctrlDate:FormControl){
    let year = new Date(ctrlDate.value).getFullYear();
    let today = new Date().getFullYear();
    if( Math.abs(today-year) >= 150){
      return{ invalidDOB:true };
    }
    return null;
  }

  public validatePassword(fg:FormGroup){
    let confirmPswrdCtrl = fg.get('ConfirmPassword');
  
    if(confirmPswrdCtrl.errors == null || confirmPswrdCtrl.hasError('pswrdMismatched')){
      if(fg.get('Password').value != confirmPswrdCtrl.value){
        //You have to set the error on confirmPswrd, instead of Password group.
        confirmPswrdCtrl.setErrors({ 'pswrdMismatched':true });
      }
      else
        confirmPswrdCtrl.setErrors(null);
    }
    
  }

}
