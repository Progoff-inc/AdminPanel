import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  userForm:FormGroup;
  save = false;
  submitted = false;
  constructor(private fb:FormBuilder, private us:UserService, private router:Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Login: ['', [Validators.required]],
      Password: ['', Validators.required]
    });
  }

  signIn(){
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }
    this.us.signIn(this.userForm.value.Login, this.userForm.value.Password).subscribe(data => {
      if(data){
        console.log(data);
        this.us.user = {Login:this.userForm.value.Login, Password:this.userForm.value.Password};
        this.us.save(true);
        this.router.navigate(['/']);
      }
      
    })
  }
  get f(){return this.userForm.controls};
}
