import { LoginComponent } from './../login/login.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'items', redirectTo: 'items', pathMatch: 'full' },
  {
    path: 'items',
    children: [
      { path: '', component: ViewItemComponent },
      { path: 'additem', component: AddItemComponent },
      {path:'updateitem',component:UpdateItemComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ItemRoutingModule { }
