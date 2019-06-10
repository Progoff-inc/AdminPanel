import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-growings',
  templateUrl: './growings.component.html',
  styleUrls: ['./growings.component.less']
})
export class GrowingsComponent implements OnInit {

  methods = [];
  crochets = [];
  growings = [];
  constructor(public as:AdminService, public ms:ModalService) { }

  ngOnInit() {
    this.as.getMethods().subscribe(s => {
      this.methods=s;
    })
    this.as.getCrochets().subscribe(s => {
      this.crochets=s;
    })
    this.as.getGrowings().subscribe(s => {
      this.growings=s;
    })
  }

}
