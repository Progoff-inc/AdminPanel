
import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from './modal.service';
import { LoadService } from './load.service';
import { UserService } from './user.service';
import { UploadTypes } from './models';
// import { OnInit } from '@angular/core';

@Injectable()
export class AdminService{
    token:string;
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

    public getGrowing(id){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-growing&Login='+this.us.user.Login+'&Password='+this.us.user.Password+'&Id='+id);
    }

    public getPeriodical(id){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-periodical&Login='+this.us.user.Login+'&Password='+this.us.user.Password+'&Id='+id);
    }

    public getExperiment(id){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-experiment&Login='+this.us.user.Login+'&Password='+this.us.user.Password+'&Id='+id);
    }

    public getCatalogItem(id){
        return this.http.get<any>(this.baseUrl + 'controller.php?Key=get-catalog-item&Login='+this.us.user.Login+'&Password='+this.us.user.Password+'&Id='+id);
    }

    public addSolid(solid){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=add-solid&Login='+this.us.user.Login+'&Password='+this.us.user.Password, solid);
    }

    public addMethod(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=add-method&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public addInventory(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=add-inventory&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public addAuthor(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=add-author&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public addCrochet(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=add-crochet&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public addGrowing(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=add-growing&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public addPeriodical(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=add-periodical&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public addExperiment(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=add-experiment&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public addCatalog(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=add-catalog&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public updateAuthor(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=update-author&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public updateCrochet(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=update-crochet&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public updateMethod(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=update-method&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public updateInventory(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=update-inventory&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public updateSolid(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=update-solid&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public updateGrowing(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=update-growing&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public updatePeriodical(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=update-periodical&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public updateExperiment(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=update-experiment&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    public updateCatalog(enter){
        return this.http.post<any>(this.baseUrl + 'controller.php?Key=update-catalog&Login='+this.us.user.Login+'&Password='+this.us.user.Password, enter);
    }

    /**
     * Загрузка файлов на сервер
     * @param id Id родителя изображения
     * @param type тип родителя изображения
     * @param data изображение (FormData)
     * @param column столбец таблицы в который нужно вставить ссылку на файл
     */
    UploadFile(id, type:UploadTypes, data, column) {
        return this.http.post<string>(this.baseUrl + 'controller.php?Key=upload-file&Id='+id+'&Type='+type+'&Login='+encodeURIComponent(this.us.user.Login)+'&Password='+encodeURIComponent(this.us.user.Password)+'&Column='+column, data, {
          reportProgress:true,
          observe:'events'
        });
      }
}

