import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Формы
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

//Модальные окна
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './services/modal.service';

//HTTP запросы
import { HttpClientModule, HttpClient } from '@angular/common/http';

//Компоненты
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignComponent } from './sign/sign.component';
import { MenuComponent } from './menu/menu.component';
import { LoadComponent } from './load/load.component';
import { LoadService } from './services/load.service';
import { HomeComponent } from './home/home.component';
import { UserService } from './services/user.service';
import { ExperimentsComponent } from './experiments/experiments.component';
import { PeriodicalsComponent } from './periodicals/periodicals.component';
import { GrowingsComponent } from './growings/growings.component';
import { AdminService } from './services/admin.service';
import { AddMethodComponent } from './add-method/add-method.component';
import { AddCrochetComponent } from './add-crochet/add-crochet.component';
import { AddSolidComponent } from './add-solid/add-solid.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { AddExperimentComponent } from './add-experiment/add-experiment.component';
import { AddGrowingComponent } from './add-growing/add-growing.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AddPeriodicalComponent } from './add-periodical/add-periodical.component';
import { AddComponent } from './add/add.component';
import { AddCatalogComponent } from './add-catalog/add-catalog.component';
import { FileValueAccessorDirective } from 'src/file-value-accessor';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    SignComponent,
    MenuComponent,
    ModalComponent,
    LoadComponent,
    HomeComponent,
    ExperimentsComponent,
    PeriodicalsComponent,
    GrowingsComponent,
    AddMethodComponent,
    AddCrochetComponent,
    AddSolidComponent,
    AddInventoryComponent,
    AddExperimentComponent,
    AddGrowingComponent,
    AddAuthorComponent,
    AddPeriodicalComponent,
    AddComponent,
    AddCatalogComponent,
    FileValueAccessorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [FormBuilder, HttpClient, ModalService, BsModalService, UserService, LoadService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
