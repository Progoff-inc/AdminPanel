
import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from './modal.service';
import { LoadService } from './load.service';
// import { OnInit } from '@angular/core';

@Injectable()
export class UserService{
    public user:any;
    token:string;
    showContent=false;
    baseUrl:string='http://client.nomokoiw.beget.tech/admin/';

    constructor(private router:Router, private http: HttpClient, private ls:LoadService){
        // sessionStorage.removeItem('userAdminPanel');
        // localStorage.removeItem('userAdminPanel');
        if(sessionStorage.getItem('userAdminPanel')){
            let u = JSON.parse(sessionStorage.getItem('userAdminPanel'));
            this.signIn(u.Login, u.Password).subscribe(data => {
                if(data){
                    this.user = {Login:u.Login, Password:u.Password};
                    this.save();
                    this.router.events.subscribe(evt => {
                        if (!(evt instanceof NavigationEnd)) {
                            return;
                        }
                        if(!this.user){
                            this.router.navigate(['sign']);
                        }
                    })
                }else{
                    this.router.navigate(['sign']);
                }
                this.showContent = true;
                
            })
            
        }
        else if(localStorage.getItem('userAdminPanel')){
            let u = JSON.parse(localStorage.getItem('userAdminPanel'));
            this.signIn(u.Login, u.Password).subscribe(data => {
                if(data){
                    this.user = {Login:u.Login, Password:u.Password};
                    this.save();
                    this.router.events.subscribe(evt => {
                        if (!(evt instanceof NavigationEnd)) {
                            return;
                        }
                        if(!this.user){
                            this.router.navigate(['sign']);
                        }
                    })
                }else{
                    this.router.navigate(['sign']);
                }
                this.showContent = true;
            })
            
        }else{

            this.router.navigate(['sign']);
            this.showContent = true;
        }

        
    }

    set User(User:any){
        this.user = User.User;
        this.token = User.Token; 
    }

    exit(){
        this.user = null;
        sessionStorage.removeItem('userAdminPanel');
        localStorage.removeItem('userAdminPanel');
        this.router.navigate(['sign']);
    }

    /**
     * Авторизация пользователя
     * @param login login пользовтеля
     * @param password Пароль пользователя
     */
    public signIn(login:string, password:string){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=enter&Login='+login+'&Password='+password);
    }

    /**
     * Регистрация пользователя
     * @param user Новый пользователь
     */
    public signUp(user:any){
        return this.http.post<any>(this.baseUrl + 'UserController.php?Key=add-user', user);
    }

    /**
     * Сохрание данных пользователя онлайн
     * @param local сохранение пользователя в localStorage на клиенте
     */
    public save(local = false){
        if(local){
            localStorage.setItem('userAdminPanel', JSON.stringify(this.user));
        }
        sessionStorage.setItem('userAdminPanel', JSON.stringify(this.user));
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

