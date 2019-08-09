import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidatorService } from './service/user-validator.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styles: []
})
export class UserRegisterComponent implements OnInit {
  genderChoices = {
    1:'Male',
    2:'Female',
    3:'Others'
  };
  countryChoices = {
    1:'United State',
    2:'China',
    3:'United Kindgom'
  };
  constructor(private fb:FormBuilder,
              private customValidator:UserValidatorService) { }

  userForms = this.fb.group({
    userDetails : this.fb.group({
      FullName:['',[Validators.required,
                Validators.pattern('^[a-zA-Z\s]*$'),
                Validators.maxLength(40)]],
      Bios:['',Validators.maxLength(200)],
      Birthday:['',[Validators.required,
                this.customValidator.validateDOB]],
      Gender:['',Validators.required],
      Country:['',Validators.required],
      PhoneNo:['',{validators:[Validators.required,
                  Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}$')],
                  updateOn:'blur'
                }]
    }),
    accountDetails : this.fb.group({
      Email:['',[Validators.required,
                Validators.email]],
      Username:['',[Validators.required,
                    Validators.pattern('^[a-zA-Z][0-9a-zA-Z]{7,16}$')]],
      passwords:this.fb.group({
        Password:['',[
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,18}')
        ]],
        ConfirmPassword:['',Validators.required]
      },{ validators: this.customValidator.validatePassword})
    }),
    Terms:[false,Validators.requiredTrue]
  });
  

  
  ngOnInit() {
  }

  onSubmit(){
    console.log(this.userForms.value);
    console.log(this.userForms.valid);
  }

  account_validation_msgs={
    'FullName':[
      {type:'required',msg:'FullName is required'},
      {type:'pattern',msg:'Full must contain only letters'},
      {type:'maxLength',msg:'The name can only be max 40 characters long'}
    ],
    'Gender':[
      {type:'required',msg:'Please select one'},
    ],
    'Birthday':[
      {type:'required',msg:'Please enter your birthday'},
      {type:'invalidDOB',msg:'The date is invalid'},
    ],
    'Country':[
      {type:'required',msg:'Please select one'},
    ],
    'PhoneNo':[
      {type:'required',msg:'Please enter you phone number'},
      {type:'pattern',msg:'Invalid phone number'}
    ],
    'Bios':[
      {type:'maxLength',msg:'Exceeding maximum length'}
    ],
    'Email':[
      {type:'email',msg:'Invalid Email Format'},
      {type:'required',msg:'Please enter your Email'},
    ],
    'Username':[
      {type:'required',msg:'Please enter a username'},
      {type:'pattern',msg:'It must only contains letters and numbers,starts with a letter and at least 8 characters long'}
    ],
    'Password':[
      {type:'required',msg:'Please enter a password'},
      {type:'pattern',msg:'Invalid format of password'}
    ],
    'ConfirmPassword':[
      {type:'required',msg:'Please re-enter the password'},
      {type:'pswrdMismatched',msg:'The two passwords are not matched'}
    ],
    'Terms':[
      {type:'required',msg:'You must accept the terms and conditions'}
    ]
  }
  
  phoneNoAutoAdd(val:any){
    let rawStr = val.toString().replace(/-/g,'');
    let strLen = rawStr.length;
    if(strLen >= 4)
      rawStr = rawStr.slice(0,3) + '-' + rawStr.slice(3)
    if(strLen >= 7)
      rawStr = rawStr.slice(0,7) + '-' + rawStr.slice(7)
    console.log(rawStr);
    this.userForms.get('userDetails.PhoneNo').reset(rawStr);
  }

}
