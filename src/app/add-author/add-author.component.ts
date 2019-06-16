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
  
  
 
  constructor(private as:AdminService, private ms:ModalService) { 
    super();
  }

  ngOnInit() {
    if(this.item){
      this.addForm = this.fb.group({
        name: [this.item.name, Validators.required],
        surname: [this.item.surname, Validators.required],
        second_name: [this.item.second_name]
      });
    }else{
      this.addForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        second_name: ['']
      });
    }
    
  }

  send(){
    this.submitted = true;
    if(this.addForm.invalid){
      return;
    }
    if(!this.item){
      this.as.addAuthor(this.v).subscribe(x => {
        let s = this.v;
        s['id_authors']=x;
        this.items.push(s);
        this.ms.close();
      })
    }else{
      
      this.update['Id']=this.item.id_authors;
      console.log(this.update);
      this.as.updateAuthor(this.update).subscribe(x => {
        Object.keys(this.update).forEach(x => {
          if(x!='Id'){
            this.item[x]=this.update[x];
          }
        })
        this.ms.close();
      })
    }
  }

}
