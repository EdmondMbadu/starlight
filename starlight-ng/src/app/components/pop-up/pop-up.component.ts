import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {

  toDelete:boolean= false;
  titleToDelete:string="";
  post: Post;
  public postList: Post[];
  constructor (private router:Router, private data:DataService){
    this.post= new Post();
    this.postList=[this.post];
  }

  ngOnInit(){
    this.data.currentListPosts.subscribe(
      pList=> this.postList= pList
    );
    this.data.currentTitleToDelete.subscribe(
      title=>this.titleToDelete= title
    );
  }
  goToHome(event: any){
    this.router.navigate(['homepage-posts']);
  }

  deletePost(event: any){

    console.log("Please delete the post with the title", this.titleToDelete);
    this.postList.splice(this.postList.findIndex(a=> a.title=== this.titleToDelete), 1);
    this.data.updatePostList(this.postList);
    
    
    
    this.router.navigate(['homepage-posts']);
  }

}