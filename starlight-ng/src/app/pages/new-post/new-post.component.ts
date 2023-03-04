import { Component,Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})


export class NewPostComponent {

  message:string="";
  
  constructor(private router:Router,private _snackBar: MatSnackBar){}
  
  cancelNewPost(event:any){
   this.router.navigate(['homepage-posts']);
  }

  createNewPost(event:any){
    this.router.navigate(['homepage-posts']);

  }

}
