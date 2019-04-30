import { Good, NewUser, User, UserInfo } from './models';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CartItem } from './models';
import { HttpClient } from '@angular/common/http';
import { ModalService } from './modal.service';
import { LoadService } from './load.service';
// import { OnInit } from '@angular/core';

@Injectable()
export class UserService{
    public user:User;
    baseUrl:string='http://client.nomokoiw.beget.tech/vi/';

    constructor(private router:Router, private http: HttpClient, private ls:LoadService){
        
    }

    
    /**
     * Генерация пароля
     */
    GenPassword(){
        let alf = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
        var res = "";
        for(let i = 0; i<10;i++){
            let r = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            if(r > 3 ){
               if(r>6){
                res+=alf[Math.floor(Math.random() * (alf.length-1 - 0 + 1)) + 0].toUpperCase().toString();
               }
               else{
                res+=alf[Math.floor(Math.random() * (alf.length-1 - 0 + 1)) + 0].toString();
               }
               
            }
            else{
                res+=r.toString();
            }
        }
        return res;

    }
}

