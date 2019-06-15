import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { PeriodicalsComponent } from './periodicals/periodicals.component';
import { GrowingsComponent } from './growings/growings.component';
import { AddCatalogComponent } from './add-catalog/add-catalog.component';
import { AddGrowingComponent } from './add-growing/add-growing.component';
import { AddExperimentComponent } from './add-experiment/add-experiment.component';
import { AddPeriodicalComponent } from './add-periodical/add-periodical.component';
import { AddComponent } from './add/add.component';

const signRouts: Routes = [
  { path: '', component: SignInComponent, pathMatch: 'full'},
  { path: 'up', component: SignUpComponent}
  
]
const addRouts: Routes = [
  { path: '', redirectTo:'catalog', pathMatch: 'full'},
  { path: 'growing', component: AddGrowingComponent},
  { path: 'growing/:id', component: AddGrowingComponent},
  { path: 'experiment', component: AddExperimentComponent},
  { path: 'experiment/:id', component: AddExperimentComponent},
  { path: 'periodical', component: AddPeriodicalComponent},
  { path: 'periodical/:id', component: AddPeriodicalComponent},
  { path: 'catalog', component: AddCatalogComponent},
  { path: 'catalog/:id', component: AddCatalogComponent},
  
]
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign', component: SignComponent, children: signRouts },
  { path: 'experiments', component: ExperimentsComponent },
  { path: 'periodicals', component: PeriodicalsComponent },
  { path: 'growings', component: GrowingsComponent},
  { path: 'add', component: AddComponent, children: addRouts}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
