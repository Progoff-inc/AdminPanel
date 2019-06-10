import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';

@Component({
  selector: 'add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.less']
})
export class AddInventoryComponent extends AddService implements OnInit {
  @Input() items:any;
  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
