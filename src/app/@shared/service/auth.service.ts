import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLoggedIn: BehaviorSubject<boolean>;
  user:User
  readonly URL = 'https://tcxi8qf38d.execute-api.us-east-1.amazonaws.com/dev/api';

  constructor(private http:HttpClient,public router: Router,public matDialog:MatDialog
) { 
  this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
}

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
        this.isUserLoggedIn.next(true);
        let username=id.toString();
        localStorage.setItem('id',username)
        this.router.navigate(['/items'])

        }
        
      } 
    })

  }
  reset()
  {
    localStorage.clear()
    console.log(localStorage.getItem('id'))
    this.isUserLoggedIn.next(false);
    return this.isUserLoggedIn.asObservable();
  }
  getAuthStatus()
  {
    return this.isUserLoggedIn.asObservable();
  }
}
