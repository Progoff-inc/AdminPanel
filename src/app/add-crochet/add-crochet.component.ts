import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { ModalService } from '../services/modal.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'add-crochet',
  templateUrl: './add-crochet.component.html',
  styleUrls: ['./add-crochet.component.less']
})
export class AddCrochetComponent extends AddService implements OnInit {
  
 
  constructor(private as:AdminService, private ms:ModalService) { 
    super();
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      second_name: [''],
      work_place: [''],
      position: [''],
      rank: ['']
    });
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    this.as.addCrochet(this.v).subscribe(x => {
      let s = this.v;
      s['id_crochet']=x;
      this.items.push(s);
      this.ms.close();
    })
  }

}
