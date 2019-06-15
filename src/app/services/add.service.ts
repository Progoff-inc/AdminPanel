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

    get f() { return this.addForm.controls; }
    get v() { return this.addForm.value; }
}