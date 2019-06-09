import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.less']
})
export class ExperimentsComponent implements OnInit {
  inventory = [];
  experiments = [];
  constructor(public as:AdminService) { }

  ngOnInit() {
    this.as.getInventory().subscribe(s => {
      this.inventory=s;
    })
    this.as.getExperiments().subscribe(s => {
      this.experiments=s;
    })
  }

}
