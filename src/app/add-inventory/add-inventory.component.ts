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
  @Input() items:any;
  
  constructor(private as:AdminService, private ms:ModalService) { 
    super();
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      type: ['', Validators.required],
      model: ['', Validators.required],
      date_of_issue: ['', Validators.required],
      value: ['', Validators.required],
      technical_documentation: ['', Validators.required],
      information: ['']
    });
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    this.as.addInventory(this.v).subscribe(x => {
      console.log(x);
      let s = this.v;
      s['id_invetory']=x;
      this.items.push(s);
      this.ms.close();
    })
  }

}
