import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UploadTypes } from '../services/models';
import { HttpEventType } from '@angular/common/http';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'app-add-experiment',
  templateUrl: './add-experiment.component.html',
  styleUrls: ['./add-experiment.component.less']
})
export class AddExperimentComponent extends AddService implements OnInit {
  solids = [];
  inventory = [];
  einventory = [];
  constructor(private as:AdminService, private ls:LoadService) { 
    super();
  }

  ngOnInit() {
    forkJoin(this.as.getCatalog(), this.as.getInventory()).subscribe(([c,m])=>{
      this.solids = c;
      this.inventory = m;
    })
    this.addForm = this.fb.group({
      conditions: ['', Validators.required],
      id_solid: ['', Validators.required],
      rng: ['', Validators.required],
      table_of_frequency: ['', Validators.pattern(/(\.docx|\.pdf|\.txt|\.doc|\.xlsx)$/i)],
      photo: ['', Validators.pattern(/(\.png|\.jpg)$/i)]
    });

    this.addForm.valueChanges.subscribe(v=>{
      console.log(v);
    })
  }

  addInv(){
    if(this.einventory.length==0 || this.einventory[this.einventory.length-1].id_inv!=''){
      this.einventory.push({id_inv:''});
    }
    
  }
  setFile(e){
    this.files[e.target.id]=e.target.files[0];
    console.log(this.files);
  }
  send(){
    this.ls.showLoad = true;
    this.ls.load = 0;
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    if(this.einventory.length==0 || this.einventory.length==0){
      return
    }
    let p = this.v;
    p.photo = null;
    p.table_of_frequency = null;
    p['Inventory']=this.einventory;
    this.as.addExperiment(this.v).subscribe(x => {
      Object.keys(this.files).forEach(f => {
        let formData = new FormData();
        formData.append('Data', this.files[f]);
        this.as.UploadFile(x, UploadTypes.Experiment, formData, f).subscribe(event=>{
          if(event.type == HttpEventType.UploadProgress){
            this.ls.load = Math.round(event.loaded/event.total * 100);
            
          }
          else if(event.type == HttpEventType.Response){
            console.log(event.body);
            this.ls.showLoad = false;
            this.submitted = false;
            //this.ngOnInit();
          }
          
        })
      })
    })
  }



  get ps() {return this.einventory.map(x => x.id_inv)};

}
