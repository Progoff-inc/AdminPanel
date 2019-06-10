import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.less']
})
export class AddCatalogComponent extends AddService implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
