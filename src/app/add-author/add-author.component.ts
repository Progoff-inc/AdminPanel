import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';

@Component({
  selector: 'add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.less']
})
export class AddAuthorComponent extends AddService implements OnInit{
  @Input() items:any;
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
