import { Router } from '@angular/router';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { UpdateItemComponent } from './../update-item/update-item.component';
import { Item } from './../../@shared/service/item.model';
import { ItemserviceService } from './../../@shared/service/itemservice.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig, MatDialogModule, MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {
  columns = ['Item Id', 'Item Name', 'Quantity', 'Actions'];
  index = ['id', 'itemname', 'quantity'];
  items:Item[]=[];
  result:string=''
  constructor(public service: ItemserviceService,private dialog: MatDialog,public router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('id')==null)
    {
        this.router.navigate(['/login'])
    }
    this.service.getItemsList().subscribe(
      (response) => {
        this.items = response['Items'];
        this.items.sort((a,b)=>{ return <any>new Number(a.id) - <any>new Number(b.id);
        })
      },
      (error) => console.log(error)
    );
  }
  update(item: Item) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    let editPart = Object.assign({}, item);
    const dialogRef = this.dialog.open(UpdateItemComponent, { data: editPart });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  delete(item:Item){
    const message = `Are you sure you want to delete this Item?`;

    const dialogData = new ConfirmDialogModel("Delete Item?", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult)
      if(dialogResult)
      {
        console.log(item.id)
        this.service.deleteItem(item.id).subscribe((res)=>{
          console.log("oK")
          this.ngOnInit();
        });
      }
      else
      {
        console.log("dont")
      }
    });
    
  }
}
