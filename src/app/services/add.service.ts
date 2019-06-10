import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Injectable()
export class AddService{
    public addForm:FormGroup;
    public fb:FormBuilder = new FormBuilder();
    constructor(){

    }
}