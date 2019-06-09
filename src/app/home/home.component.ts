import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  solids = [];
  catalog = [];
  constructor(private router:Router, public as:AdminService) { }

  ngOnInit() {
    this.as.getSolids().subscribe(s => {
      this.solids=s;
    })
    this.as.getCatalog().subscribe(s => {
      this.catalog=s;
    })
  }

}
