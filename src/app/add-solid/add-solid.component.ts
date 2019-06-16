import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';
import { Validators } from '@angular/forms';
import { SolidTypes } from '../services/models';
import { AdminService } from '../services/admin.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'add-solid',
  templateUrl: './add-solid.component.html',
  styleUrls: ['./add-solid.component.less']
})
export class AddSolidComponent extends AddService implements OnInit {
  
 
  constructor(private as:AdminService, private ms:ModalService) { 
    super();
  }

  ngOnInit() {
    if(this.item){
      this.addForm = this.fb.group({
        name: [this.item.name, Validators.required],
        formulae: [this.item.formulae, Validators.required],
        id_type: [this.item.id_type, Validators.required]
      });
    }else{
      this.addForm = this.fb.group({
        name: ['', Validators.required],
        formulae: ['', Validators.required],
        id_type: ['', Validators.required]
      });
    }
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    if(this.item){
      this.update['Id']=this.item.id_solids;
      console.log(this.update);
      this.as.updateSolid(this.update).subscribe(x => {
        Object.keys(this.update).forEach(x => {
          if(x!='Id'){
            this.item[x]=this.update[x];
          }
        })
        this.ms.close();
      })
    }else{
      this.as.addSolid(this.v).subscribe(x => {
        let s = this.v;
        s['id_solids']=x;
        this.items.push(s);
        this.ms.close();
      })
    }
  }

  get st() {return [SolidTypes.Glass, SolidTypes.Solid] };

}
