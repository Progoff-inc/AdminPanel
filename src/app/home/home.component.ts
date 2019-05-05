import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private us:UserService) { }

  ngOnInit() {
    if(!this.us.user){
      this.router.navigate(['sign']);
    }
    
  }

}
