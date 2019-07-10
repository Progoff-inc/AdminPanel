import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { ModalService } from '../services/modal.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'add-method',
  templateUrl: './add-method.component.html',
  styleUrls: ['./add-method.component.less']
})
export class AddMethodComponent extends AddService implements OnInit {
  
 
  constructor(private as:AdminService, private ms:ModalService) { 
    super();
  }

  ngOnInit() {
    if(this.item){
      this.addForm = this.fb.group({
        name: [this.item.name, Validators.required]
      });
    }else{
      this.addForm = this.fb.group({
        name: ['', Validators.required]
      });
    }
    
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    if(this.item){
      this.update['Id']=this.item.id_method;
      this.as.updateMethod(this.update).subscribe(x => {
        Object.keys(this.update).forEach(x => {
          if(x!='Id'){
            this.item[x]=this.update[x];
          }
        })
        this.ms.close();
      })
    }else{
      this.as.addMethod(this.v).subscribe(x => {
        let s = this.v;
        s['id_method']=x;
        this.items.push(s);
        this.ms.close();
      })
    }
    
  }
}
