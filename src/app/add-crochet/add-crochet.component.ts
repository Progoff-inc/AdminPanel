import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';

@Component({
  selector: 'add-crochet',
  templateUrl: './add-crochet.component.html',
  styleUrls: ['./add-crochet.component.less']
})
export class AddCrochetComponent extends AddService implements OnInit {
  @Input() items:any;
  constructor() {
    super();
   }

  ngOnInit() {
  }

}
