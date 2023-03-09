import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/models/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.css']
})
export class PostCartComponent {
  communityType:string="Essay";
  titleToDelete:string="";
  post: Post;
  public postList: Post[];
  
  constructor(private data: DataService){
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
  

  @Input ()currentPost: Post= new Post();
  // @Input() title: string = '';

  counter: number = 0;
  seeComments:boolean = false;


  showComments(event:any){
    this.seeComments=!this.seeComments;
  }
  incrementCounter(event:any){
    this.counter++;
  }
  deletePost(title?:string){
    console.log("Please delete the post with the title", title);
   this.postList.splice(this.postList.findIndex(a=> a.title=== title), 1);
   this.data.updatePostList(this.postList);
    
  }
}
