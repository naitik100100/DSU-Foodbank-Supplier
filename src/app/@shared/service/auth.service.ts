import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserLoggedIn  = false;
  user:User
  readonly URL = 'https://tcxi8qf38d.execute-api.us-east-1.amazonaws.com/dev/api';

  constructor(private http:HttpClient,public router: Router,public matDialog:MatDialog
) { }

  getUser(id:number,password:string)
  {
    return this.http.get(this.URL+'/user/'+id).subscribe((res)=>{
      console.log(res)
      if(res['Item']==null)
      {
      //   this.matDialog.open(MatDialogWrapperComponent,{data:{
      //     header: "Failure",
      //     content: error.error.message
      // }})

      }
      else{
        if(res['Item'].password==password)
        {
        console.log("ok")
        this.isUserLoggedIn=true;
        let username=id.toString();
        localStorage.setItem('id',username)
        this.router.navigate(['/items'])

        }
        
      } 
    })

  }
}
