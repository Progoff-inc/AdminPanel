import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { PeriodicalsComponent } from './periodicals/periodicals.component';
import { GrowingsComponent } from './growings/growings.component';

const signRouts: Routes = [
  { path: '', component: SignInComponent, pathMatch: 'full'},
  { path: 'up', component: SignUpComponent}
  
]
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign', component: SignComponent, children: signRouts },
  { path: 'experiments', component: ExperimentsComponent },
  { path: 'periodicals', component: PeriodicalsComponent },
  { path: 'growings', component: GrowingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
