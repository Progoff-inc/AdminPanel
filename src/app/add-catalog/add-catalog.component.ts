import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { LoadService } from '../services/load.service';
import { lstat } from 'fs';
import { UploadTypes } from '../services/models';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.less']
})
export class AddCatalogComponent extends AddService implements OnInit {

  solids = [];
  growings = [];
  constructor(private as:AdminService, private ls:LoadService) { 
    super();
  }

  ngOnInit() {
    forkJoin(this.as.getSolids(), this.as.getGrowings()).subscribe(([c,m])=>{
      this.solids = c;
      this.growings = m;
    })
    this.addForm = this.fb.group({
      id_solids: ['', Validators.required],
      id_growing: ['', Validators.required],
      date_of_delivery: ['', Validators.required],
      foto_of_range: ['', Validators.pattern(/(\.png|\.jpg)$/i)],
      foto_of_solid: ['', Validators.pattern(/(\.png|\.jpg)$/i)],

      hyper_attributes: [''],
      hyper_range: [''],
      comments: ['']
    });

    this.addForm.valueChanges.subscribe(v=>{
      console.log(v);
    })
  }

  setFile(e){
    this.files[e.target.id]=e.target.files[0];
    console.log(this.files);
  }

  send(){
    this.submitted = true;
    this.ls.showLoad = true;
    this.ls.load = 0;
    if(this.addForm.invalid){
      return;
    }
    let p = this.v;
    p.foto_of_range=null;
    p.foto_of_solid = null;
    this.as.addCatalog(p).subscribe(x => {
      console.log(x);
      Object.keys(this.files).forEach(f => {
        let formData = new FormData();
        formData.append('Data', this.files[f]);
        this.as.UploadFile(x, UploadTypes.Catalog, formData, f).subscribe(event=>{
          if(event.type == HttpEventType.UploadProgress){
            this.ls.load = Math.round(event.loaded/event.total * 100);
            
          }
          else if(event.type == HttpEventType.Response){
            console.log(event.body);
            this.ls.showLoad = false;
            //this.ngOnInit();
          }
          
        })
      })
    })
  }

}
