import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';

const signRouts: Routes = [
  { path: '', component: SignInComponent, pathMatch: 'full'},
  { path: 'up', component: SignUpComponent}
  
]
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign', component: SignComponent, children: signRouts }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
