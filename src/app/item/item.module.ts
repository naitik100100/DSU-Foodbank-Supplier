import { FormsModule, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ItemRoutingModule } from './item-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { ItemComponent } from './item.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatButton, MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [AddItemComponent, UpdateItemComponent,ItemComponent, ViewItemComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,ItemRoutingModule,MatTableModule,FormsModule,ReactiveFormsModule,MatButtonModule
  ],
  providers:[]
})
export class ItemModule { }
