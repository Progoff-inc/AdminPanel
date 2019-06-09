import { Good, NewUser, User, UserInfo, UserResponse } from './models';
import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { CartItem } from './models';
import { HttpClient } from '@angular/common/http';
import { ModalService } from './modal.service';
import { LoadService } from './load.service';
import { UserService } from './user.service';
// import { OnInit } from '@angular/core';

@Injectable()
export class AdminService{
    token:string;
    users:User[] = [];
    baseUrl:string='http://client.nomokoiw.beget.tech/admin/';

    constructor(private router:Router, private http: HttpClient, private ls:LoadService, private us:UserService){
        

        
    }


    
    public getSolids(){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-solids&Login='+this.us.user.Login+'&Password='+this.us.user.Password);
    }

    public getCatalog(){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-catalog&Login='+this.us.user.Login+'&Password='+this.us.user.Password);
    }

    public getExperiments(){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-experiments&Login='+this.us.user.Login+'&Password='+this.us.user.Password);
    }

    public getPeriodicals(){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-periodicals&Login='+this.us.user.Login+'&Password='+this.us.user.Password);
    }

    public getInventory(){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-inventory&Login='+this.us.user.Login+'&Password='+this.us.user.Password);
    }

    public getAuthors(){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-authors&Login='+this.us.user.Login+'&Password='+this.us.user.Password);
    }

    public getMethods(){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-methods&Login='+this.us.user.Login+'&Password='+this.us.user.Password);
    }

    public getGrowings(){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-growings&Login='+this.us.user.Login+'&Password='+this.us.user.Password);
    }

    public getCrochets(){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-crochets&Login='+this.us.user.Login+'&Password='+this.us.user.Password);
    }
    /**
     * Регистрация пользователя
     * @param user Новый пользователь
     */
    public signUp(user:any){
        return this.http.post<UserResponse>(this.baseUrl + 'UserController.php?Key=add-user', user);
    }
}

