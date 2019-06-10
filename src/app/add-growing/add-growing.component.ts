import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';

@Component({
  selector: 'app-add-growing',
  templateUrl: './add-growing.component.html',
  styleUrls: ['./add-growing.component.less']
})
export class AddGrowingComponent extends AddService implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
