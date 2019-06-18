import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-growing',
  templateUrl: './add-growing.component.html',
  styleUrls: ['./add-growing.component.less']
})
export class AddGrowingComponent extends AddService implements OnInit {
  crochets = [];
  methods = [];
 
  constructor(private as:AdminService, private route:ActivatedRoute) { 
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
    if(this.route.snapshot.paramMap.get("id")){
      this.as.getGrowing((this.route.snapshot.paramMap.get("id"))).subscribe(x => {
        this.item = x;
        this.addForm = this.fb.group({
          id_crochet: [x.id_crochet, Validators.required],
          id_method: [x.id_method, Validators.required],
          comment: [x.comment]
        });
      })
      
    }
    
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    if(!this.item){
      this.as.addGrowing(this.v).subscribe(x => {
        this.addForm.reset();
        this.submitted = false;
      })
    }else{
      this.update['Id']=this.item.id_growing;
      this.as.updateGrowing(this.update).subscribe(x => {
        this.submitted = false;
        this.update={};
      })
    }
  }

}
