import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-growing',
  templateUrl: './add-growing.component.html',
  styleUrls: ['./add-growing.component.less']
})
export class AddGrowingComponent extends AddService implements OnInit {
  crochets = [];
  methods = [];
 
  constructor(private as:AdminService) { 
    super();
  }

  ngOnInit() {
    forkJoin(this.as.getCrochets(), this.as.getMethods()).subscribe(([c,m])=>{
      this.crochets = c;
      this.methods = m;
    })
    this.addForm = this.fb.group({
      id_crochet: ['', Validators.required],
      id_method: ['', Validators.required],
      comment: ['']
    });
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    console.log(this.v);
    this.as.addGrowing(this.v).subscribe(x => {
      this.addForm.reset();
      this.submitted = false;
    })
  }

}
