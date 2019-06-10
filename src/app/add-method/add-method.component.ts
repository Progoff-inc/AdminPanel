import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';

@Component({
  selector: 'add-method',
  templateUrl: './add-method.component.html',
  styleUrls: ['./add-method.component.less']
})
export class AddMethodComponent extends AddService implements OnInit {
  @Input() items:any;
  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
