import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { DetailsModule } from './details/details.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {  path:'',component:LoginComponent
},
  {  path:'UserManagementConsole',component:DetailsComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes),DetailsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
