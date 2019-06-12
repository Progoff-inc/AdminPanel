import { Component, OnInit, Input } from '@angular/core';
import { AddService } from '../services/add.service';
import { AdminService } from '../services/admin.service';
import { ModalService } from '../services/modal.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.less']
})
export class AddAuthorComponent extends AddService implements OnInit{
  @Input() items:any;
 
  constructor(private as:AdminService, private ms:ModalService) { 
    super();
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      second_name: ['']
    });
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    this.as.addAuthor(this.v).subscribe(x => {
      let s = this.v;
      s['id_authors']=x;
      this.items.push(s);
      this.ms.close();
    })
  }

}
