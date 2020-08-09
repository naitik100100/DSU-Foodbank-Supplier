import { Route, Router } from '@angular/router';
import { Item } from './../../@shared/service/item.model';
import { ItemserviceService } from './../../@shared/service/itemservice.service';
import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  updateItemForm:FormGroup;
  constructor(public service: ItemserviceService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    public dialogRef: MatDialogRef<UpdateItemComponent>,
    public router:Router) 
    { }

  ngOnInit(): void {
    if(localStorage.getItem('id')==null)
    {
      this.router.navigate(['/login']);
    }
    this._createitemForm()
  }
  onSubmit() {    
      this.service.editItem(this.updateItemForm.value).subscribe((res)=>{
        console.log("OK")
      },
      (err)=>
      {
        console.log("error")
      }
      );
    }
  get id() {
    return this.updateItemForm.controls.id;
  }
  get itemname() {
    return this.updateItemForm.controls.itemname;
  }
  get quantity() {
    return this.updateItemForm.controls.quantity;
  }
  private _createitemForm() {
    this.updateItemForm = this.formBuilder.group(
      {
        id:[this.data.id, Validators.required],
        itemname:[this.data.itemname, Validators.required],
        quantity:[this.data.quantity, Validators.required],
      },
    );
    this.id.setValue(this.data.id)
    this.itemname.setValue(this.data.itemname)
    this.quantity.setValue(this.data.quantity)
  }
}
