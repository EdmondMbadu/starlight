import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.css']
})
export class PostCartComponent {// implements OnInit {


  @Input() title: string = '';
  @Output() click = new EventEmitter<MouseEvent>();
  @Input() isActive: boolean = false;
  @Input() likes: number =0;
  @Input() seeComments:boolean=false;

  constructor(private dialogRef : MatDialog){}

  openDialog(){
    this.dialogRef.open(PopUpComponent,{
    });
  }

  showComments(event:any){
    this.seeComments=!this.seeComments;
  }

  incrementCounter(event:any){
    this.likes += (this.isActive) ? -1 : 1;
		this.isActive = !this.isActive;
  }
}
