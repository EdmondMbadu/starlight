import { Component,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})


export class NewPostComponent {
  public postList: Post[];
  commuunityList:string[];
  public post:Post;
  user:User;
  title:string="";
  label:string="";
  date:string="";
  author:string="";
  content:string="";
  author_id:number = 7;

  posts: Post[] = [];
  newPost:Post = new Post();
 

  message:string="";
  
  constructor(private router:Router, private data: DataService, private postService:PostService, private userService: UserService){
    this.post= new Post();
    this.user= new User();
    this.postList=[this.post];
    this.commuunityList= this.data.communityList;

    // this.newPost.date = this.getCurrentDate();
  }

  ngOnInit(){
    this.getUser();

    this.data.currentListPosts.subscribe(
      pList=>this.postList= pList
    );

  }
  
  getUser(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        console.log("getUserData return: ", this.user);
      }
    )
	}

  getPosts(): void {
    this.postService.getAllPosts()
    .subscribe( posts => this.posts = posts);
  }


  cancelNewPost(event:any){
   this.router.navigate(['homepage-posts']);
  }

  createNewPost() {
    // this.postService.makeNewPost(this.title, this.content, this.label, this.likes, this.author_id)
    // this.newPost.author_id = this.user.id;
    

    this.postService.addPost(this.newPost)
    .subscribe(
      (data) => {
        console.log("Post created = " + data);
        console.log("newPost.author name = " + this.newPost.author_name);
        this.posts.push(this.newPost);
        // this.newPost = new Post();

        // this.post.title = this.title;
        // this.post.author = "Stef";
        // // this.post.author_id = this.author_id;
        // this.post.content = this.content;
        // this.post.label = this.label;
        // this.post.likes = this.likes;
        // this.post.date = this.getCurrentDate();
        // this.postList.unshift(this.post);
        // this.data.updatePostList(this.postList);
        this.router.navigate(['homepage-posts']);
      },
      (error) => {
        console.log('Create post failed: ', error);
      }
    )
  }


  getCurrentDate(): string{
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${month}/${day}/${year}`;

  return currentDate;

  }
}
