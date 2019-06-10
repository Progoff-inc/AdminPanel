import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';

@Component({
  selector: 'app-add-experiment',
  templateUrl: './add-experiment.component.html',
  styleUrls: ['./add-experiment.component.less']
})
export class AddExperimentComponent extends AddService implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
