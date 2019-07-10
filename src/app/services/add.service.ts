import { Injectable, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Injectable()
export class AddService{
    @Input() item:any;
    @Input() items:any;
    public update = {};
    public addForm:FormGroup;
    public fb:FormBuilder = new FormBuilder();
    public submitted = false;
    public files = {};
    constructor(){

    }

    getValue(v){
        if(v){
            return v.split('\\')[2];
        }
        
    }
    setFile(e){
      this.files[e.target.id]=e.target.files[0];
    }

    updArray(name, arr){
        this.update[name]=arr;
    }

    upd(item){
        this.update[item.id]=item.value;
       
    }

    deleteItem(parent, arr, name, id){
        parent[arr] = parent[arr].filter(x => x[name]!=id);
        return true;
    }

    get f() { return this.addForm.controls; }
    get v() { return this.addForm.value; }
    get upd_length() { return Object.keys(this.update).length+Object.keys(this.files).filter(x => !!this.files[x]).length; }
}