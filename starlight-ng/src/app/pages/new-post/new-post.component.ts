import { Component,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})


export class NewPostComponent {
  public postList: Post[];
  commuunityList:string[];
  public post:Post;
  title:string="";
  label:string="";
  date:string="";
  author:string="";
  content:string="";
 

  message:string="";
  
  constructor(private router:Router, private data: DataService){
    this.post= new Post();
    this.postList=[this.post];
    this.commuunityList= this.data.communityList;


  }

  ngOnInit(){
    this.data.currentListPosts.subscribe(
      pList=>this.postList= pList
      );

  }
  
  cancelNewPost(event:any){
   this.router.navigate(['homepage-posts']);
  }

  createNewPost(event:any){
    this.post.title=this.title;
    this.post.author= "Ananymous";
    this.post.content= this.content;
    this.post.label= this.label;
    this.post.date= this.getCurrentDate();
    this.postList.unshift(this.post);
    this.data.updatePostList(this.postList);
    this.router.navigate(['homepage-posts']);

    

  }
  getCurrentDate(): string{
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}/${month}/${year}`;

  return currentDate;

  }
}
