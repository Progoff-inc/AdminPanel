import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.less']
})
export class ExperimentsComponent implements OnInit {
  inventory = [];
  experiments = [];
  constructor(public as:AdminService, public ms:ModalService) { }

  ngOnInit() {
    this.as.getInventory().subscribe(s => {
      this.inventory=s;
    })
    this.as.getExperiments().subscribe(s => {
      this.experiments=s;
    })
  }

}
