import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/models/post';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';


@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.css']
})
export class PostCartComponent {
  @Input() title: string = '';
  @Input() isActive: boolean = false;
  @Input() likes: number =0;
  @Input() seeComments:boolean=false;

  toDelete:boolean= false;
  communityType:string="Essay";
  titleToDelete:string="";
  post: Post;
  public postList: Post[];
  
  constructor(private data: DataService, private dialogRef : MatDialog){
    this.post= new Post();
    this.postList=[this.post];
  }
  ngOnInit(){
this.data.currentCommunityTag.subscribe(
  community=>this.communityType= community
);

this.data.currentListPosts.subscribe(
  pList=> this.postList= pList
);


  }

  openDialog(event: any, title?:string){
    // console.log("The current title is in dialog", this.currentPost.title);
    this.dialogRef.open(PopUpComponent,{
    });
    this.data.deleteTitle(title!);
  }

  

  @Input ()currentPost: Post= new Post();

  counter: number = 0;

  showComments(event:any){
    this.seeComments=!this.seeComments;
  }
  incrementCounter(event:any){
    this.likes += (this.isActive) ? -1 : 1;
		this.isActive = !this.isActive;
  }
}
