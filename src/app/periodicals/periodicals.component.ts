import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-periodicals',
  templateUrl: './periodicals.component.html',
  styleUrls: ['./periodicals.component.less']
})
export class PeriodicalsComponent implements OnInit {

  authors = [];
  periodicals = [];
  constructor(public as:AdminService, public ms:ModalService) { }

  ngOnInit() {
    this.as.getAuthors().subscribe(s => {
      this.authors=s;
    })

    this.as.getPeriodicals().subscribe(s => {
      this.periodicals=s;
    })
  }

}
