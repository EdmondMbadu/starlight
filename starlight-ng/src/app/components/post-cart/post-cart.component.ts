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

  @Input() isActive: boolean = false;
  @Input() likes: number =0;
  @Input() seeComments:boolean=false;

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

  openDialog(){
    this.dialogRef.open(PopUpComponent,{
    });
  }

  

  @Input ()currentPost: Post= new Post();

  counter: number = 0;
  // seeComments:boolean = false;


  showComments(event:any){
    this.seeComments=!this.seeComments;
  }
  incrementCounter(event:any){
    this.likes += (this.isActive) ? -1 : 1;
		this.isActive = !this.isActive;
  }
  deletePost(title?:string){
    console.log("Please delete the post with the title", title);
   this.postList.splice(this.postList.findIndex(a=> a.title=== title), 1);
   this.data.updatePostList(this.postList);
    
  }
}
