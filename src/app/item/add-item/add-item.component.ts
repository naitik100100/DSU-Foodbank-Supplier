import { AuthService } from './../../@shared/service/auth.service';
import { Router } from '@angular/router';
import { Item } from './../../@shared/service/item.model';
import { ItemserviceService } from './../../@shared/service/itemservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  status:any

  constructor(public auth:AuthService,public service: ItemserviceService,private formBuilder: FormBuilder,public router:Router) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('id'))
      if(localStorage.getItem('id')==null){
      this.router.navigate(['/login']);
      }
      else{
        this._createitemForm()

        this.service.getItemsList().subscribe((data:Item[]) => {
          console.log(data)
            }
        );
      }
  }

  onSubmit() {
    let itemid=0;
    this.service.getItemsList().subscribe((data)=>{
      data['Items'].forEach((item: any) => {
      if(item.id>itemid)
      {
        itemid=item.id;
      }
      });
      let postdata:Item=this.getItemModel(itemid)
      this.service.postItem(postdata).subscribe((res)=>{
        console.log("OK")
      },
      (err)=>
      {
        console.log("error")
      }
      );
    });
    }

    getItemModel(itemid:number)
    {
      let data={
        id:itemid+1,
        itemname:this.itemname.value,
        quantity:this.quantity.value
      }

      return data
    }
    get itemname() {
      return this.addItemForm.controls.itemname;
    }
    get quantity() {
      return this.addItemForm.controls.quantity;
    }
    private _createitemForm() {
      this.addItemForm = this.formBuilder.group(
        {
          itemname:['', Validators.required],
          quantity:['', Validators.required],
        },
      );
    }
}

