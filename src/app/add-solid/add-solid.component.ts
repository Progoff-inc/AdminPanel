import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'add-solid',
  templateUrl: './add-solid.component.html',
  styleUrls: ['./add-solid.component.less']
})
export class AddSolidComponent extends AddService implements OnInit {
  @Input() items:any;
  constructor() { 
    super();
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      Name: ['', Validators.required]
    });
  }

}
