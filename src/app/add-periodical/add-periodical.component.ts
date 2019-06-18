import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { ModalService } from '../services/modal.service';
import { Validators } from '@angular/forms';
import { PeriodicTypes } from '../services/models';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-periodical',
  templateUrl: './add-periodical.component.html',
  styleUrls: ['./add-periodical.component.less']
})
export class AddPeriodicalComponent extends AddService implements OnInit {
  psolids = [];
  pauthors = [];
  solids = [];
  authors = [];
  constructor(private as:AdminService, private route:ActivatedRoute) { 
    super();
  }

  ngOnInit() {
    forkJoin(this.as.getSolids(), this.as.getAuthors()).subscribe(([c,m])=>{
      this.solids = c;
      this.authors = m;
    })
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      publishing_house: ['', Validators.required],
      cipher: [''],
      year: ['', Validators.required],
      value: ['', Validators.required],
      tom: [''],
      num_part: [''],
      location: [''],
      hyper_text: [''],
      information: ['']
    });
    if(this.route.snapshot.paramMap.get("id")){
      this.as.getPeriodical((this.route.snapshot.paramMap.get("id"))).subscribe(x => {
        this.item = x;
        this.pauthors=x.Authors;
        this.psolids=x.Solids;
        this.addForm = this.fb.group({
          name: [this.item.name, Validators.required],
          type: [this.item.type, Validators.required],
          publishing_house: [this.item.publishing_house, Validators.required],
          cipher: [this.item.cipher],
          year: [this.item.year, Validators.required],
          value: [this.item.value, Validators.required],
          tom: [this.item.tom],
          num_part: [this.item.num_part],
          location: [this.item.location],
          hyper_text: [this.item.hyper_text],
          information: [this.item.information]
        });
      })
      
    }
  }

  addSolid(){
    console.log(this.psolids)
    if(this.psolids.length==0 || this.psolids[this.psolids.length-1].id_solid!=''){
      this.psolids.push({id_solid:''});
    }
    
  }
  addAuthor(){
    if(this.pauthors.length==0 || this.pauthors[this.pauthors.length-1].id_author!=''){
      this.pauthors.push({id_author:''});
    }
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    if(this.pauthors.length==0 || this.psolids.length==0){
      return
    }
    let p = this.v;
    p['Solids']=this.psolids;
    p['Authors']=this.pauthors;
    this.as.addPeriodical(p).subscribe(x => {
      this.addForm.reset();
      this.pauthors=[];
      this.psolids=[];
      this.submitted = false;
    })
  }

  get st() {return [PeriodicTypes.Book, PeriodicTypes.Article, PeriodicTypes.Magazine]}
  get ps() {return this.psolids.map(x => x.id_solid)};
  get pa() {return this.pauthors.map(x => x.id_author)};

}
