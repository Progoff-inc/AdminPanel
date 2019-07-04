import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UploadTypes } from '../services/models';
import { HttpEventType } from '@angular/common/http';
import { LoadService } from '../services/load.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-experiment',
  templateUrl: './add-experiment.component.html',
  styleUrls: ['./add-experiment.component.less']
})
export class AddExperimentComponent extends AddService implements OnInit {
  solids = [];
  inventory = [];
  einventory = [];
  tpattern=/(\.docx|\.pdf|\.txt|\.doc|\.xlsx|\.xls)$/i;
  ipattern=/(\.png|\.jpg)$/i;
  constructor(private as:AdminService, private ls:LoadService, private route:ActivatedRoute, private router:Router) { 
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
      table_of_frequency: ['', Validators.pattern(this.tpattern)],
      photo: ['', Validators.pattern(this.ipattern)]
    });
    if(this.route.snapshot.paramMap.get("id")){
      this.as.getExperiment((this.route.snapshot.paramMap.get("id"))).subscribe(x => {
        this.item = x;
        console.log(x);
        this.einventory = x.Inventory;
        this.addForm = this.fb.group({
          conditions: [this.item.conditions, Validators.required],
          id_solid: [this.item.id_solid, Validators.required],
          rng: [this.item.rng, Validators.required],
          table_of_frequency: ['', Validators.pattern(this.tpattern)],
          photo: ['', Validators.pattern(this.ipattern)]
        });
      })
      
    }

    this.addForm.valueChanges.subscribe(v=>{
      console.log(v);
    })
  }

  addInv(){
    this.update['Inventory']=this.einventory;
    if(this.einventory.length==0 || this.einventory[this.einventory.length-1].id_inv!=''){
      this.einventory.push({id_inv:''});
    }
    
  }
  send(){
    
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    if(this.einventory.length==0 || this.einventory.length==0){
      return
    }
    
    if(!this.item){
      this.ls.showLoad = true;
      this.ls.load = 0;
      let p = this.v;
      p.photo = null;
      p.table_of_frequency = null;
      p['Inventory']=this.einventory;
      this.as.addExperiment(this.v).subscribe(x => {
        Object.keys(this.files).filter(file => !!this.files[file]).forEach(f => {
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
              this.router.navigate(['/add/experiment/'+x]);
            }
            
          })
        })
      })
    }else{
      let keys = Object.keys(this.files).filter(file => !!this.files[file]);
      let k = keys.length;
      if(Object.keys(this.update).length>0){
        this.update['Id']=this.item.id_experiment;
        if(this.update['Inventory']){
          this.update['Inventory']=this.einventory.map(x => {let s = { id_inv:x.id_inv }; return s; });
        }
        this.as.updateExperiment(this.update).subscribe(x => {
          this.update = {};
          if(k==0){
            this.ls.showLoad = false;
            this.submitted = false;
            this.ngOnInit();
          }
        })
      }else{
        
        keys.forEach(f => {
          let formData = new FormData();
          formData.append('Data', this.files[f]);
          this.as.UploadFile(this.item.id_experiment, UploadTypes.Experiment, formData, f).subscribe(event=>{
            if(event.type == HttpEventType.UploadProgress){
              this.ls.load = Math.round(event.loaded/event.total * 100);
              
            }
            else if(event.type == HttpEventType.Response){
              console.log(event.body);
              k--;
              if(k==0 && Object.keys(this.update).length==0){
                this.ls.showLoad = false;
                this.submitted = false;
                this.files = {};
                this.ngOnInit();
              }
              
              
            }
            
          })
        })
      }
      
      console.log(this.update);
      console.log(this.files);
    }
    
  }



  get ps() {return this.einventory.map(x => x.id_inv)};

}
