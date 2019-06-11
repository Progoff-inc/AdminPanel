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
  @Input() items:any;
 
  constructor(private as:AdminService, private ms:ModalService) { 
    super();
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    this.as.addMethod(this.v).subscribe(x => {
      let s = this.v;
      s['id_method']=x;
      this.items.push(s);
      this.ms.close();
    })
  }
}
