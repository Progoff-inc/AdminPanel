import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { LoadService } from '../services/load.service';
import { UploadTypes } from '../services/models';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.less']
})
export class AddCatalogComponent extends AddService implements OnInit {

  solids = [];
  growings = [];
  constructor(private as:AdminService, private ls:LoadService, private route:ActivatedRoute, private router:Router) { 
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
    if(this.route.snapshot.paramMap.get("id")){
      this.as.getCatalogItem((this.route.snapshot.paramMap.get("id"))).subscribe(x => {
        this.item = x;
        console.log(x);
        this.addForm = this.fb.group({
          id_solids: [this.item.id_solids, Validators.required],
          id_growing: [this.item.id_growing, Validators.required],
          date_of_delivery: [this.item.date_of_delivery, Validators.required],
          foto_of_range: ['', Validators.pattern(/(\.png|\.jpg)$/i)],
          foto_of_solid: ['', Validators.pattern(/(\.png|\.jpg)$/i)],

          hyper_attributes: [this.item.hyper_attributes],
          hyper_range: [this.item.hyper_range],
          comments: [this.item.comments]
        });
      })
      
    }

    
  }

  send(){
    this.submitted = true;
    this.ls.showLoad = true;
    this.ls.load = 0;
    if(this.addForm.invalid){
      return;
    }
    if(!this.item){
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
              this.router.navigate(['/add/experiment/'+x]);
            }
            
          })
        })
      })
    }else{
      let keys = Object.keys(this.files).filter(file => !!this.files[file]);
      let k = keys.length;
      if(Object.keys(this.update).length>0){
        this.update['Id']=this.item.id_catalog_of_solids;
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
          this.as.UploadFile(this.item.id_catalog_of_solids, UploadTypes.Catalog, formData, f).subscribe(event=>{
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
    }
  }

}
