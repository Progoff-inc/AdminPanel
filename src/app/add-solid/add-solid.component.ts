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
  @Input() items:any;
  constructor(private as:AdminService, private ms:ModalService) { 
    super();
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      formulae: ['', Validators.required],
      id_type: ['', Validators.required]

    });
  }

  send(){
    this.as.addSolid(this.v).subscribe(x => {
      let s = this.v;
      s['id_solids']=x;
      this.items.push(s);
      this.ms.close();
    })
  }

  get st() {return [SolidTypes.Glass, SolidTypes.Solid] };

}
