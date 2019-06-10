import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';

@Component({
  selector: 'app-add-periodical',
  templateUrl: './add-periodical.component.html',
  styleUrls: ['./add-periodical.component.less']
})
export class AddPeriodicalComponent extends AddService implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
