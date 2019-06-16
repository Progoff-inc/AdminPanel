import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { ModalService } from '../services/modal.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.less']
})
export class AddInventoryComponent extends AddService implements OnInit {
  
  
  constructor(private as:AdminService, private ms:ModalService) { 
    super();
  }

  ngOnInit() {
    if(this.item){
      this.addForm = this.fb.group({
        type: [this.item.type, Validators.required],
        model: [this.item.model, Validators.required],
        date_of_issue: [this.item.date_of_issue, Validators.required],
        value: [this.item.value, Validators.required],
        technical_documentation: [this.item.technical_documentation, Validators.required],
        information: [this.item.information]
      });
    }else{
      this.addForm = this.fb.group({
        type: ['', Validators.required],
        model: ['', Validators.required],
        date_of_issue: ['', Validators.required],
        value: ['', Validators.required],
        technical_documentation: ['', Validators.required],
        information: ['']
      });
    }
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    if(this.item){
      this.update['Id']=this.item.id_inventory;
      console.log(this.update);
      this.as.updateInventory(this.update).subscribe(x => {
        Object.keys(this.update).forEach(x => {
          if(x!='Id'){
            this.item[x]=this.update[x];
          }
        })
        this.ms.close();
      })
    }else{
      this.as.addInventory(this.v).subscribe(x => {
        console.log(x);
        let s = this.v;
        s['id_inventory']=x;
        this.items.push(s);
        this.ms.close();
      })
    }
    
  }

}
