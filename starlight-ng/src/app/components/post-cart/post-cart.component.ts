import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.css']
})
export class PostCartComponent {
  title: string = '';
  isActive: boolean = false;
  isLiked:boolean = false;
  likes: number =0;
  seeComments:boolean=false;
  user: User;
  posts: Post[];

  @Input() currentPost: Post;

  toDelete:boolean= false;
  communityType:string="Essay";
  titleToDelete:string="";
  post: Post;
  public postList: Post[];
  
  constructor(
    private data: DataService, 
    private dialogRef : MatDialog, 
    private userService: UserService, 
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.post= new Post();
    this.user = new User();
    this.posts = [];
    this.postList=[this.post];
    this.currentPost = new Post();
  }

  ngOnInit(){
    this.getUser();

    this.getPostLikes();

    console.log("current post id = " + this.currentPost.author_name);
    this.data.currentCommunityTag.subscribe(
      community=>this.communityType= community
    );

    this.data.currentListPosts.subscribe(
      pList=> this.postList= pList
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

  getPost(): void {
    this.route.params.subscribe(params => {
      const postId = params['id'];
      this.postService.getPost(postId).subscribe(post => {
        this.currentPost = post;
        // this.isLiked = this.currentPost.is_liked;
      });
    });
  }

  getPostLikes(): void {
    this.postService.getPostLikes(this.currentPost.id).subscribe(
      (likes) => {
        this.isLiked = likes.some(like => like.user_id === this.user.id);
      }
    )
  }

  // getPosts(): void {
  //   this.postService.getAllPosts()
  //   .subscribe( posts => this.posts = posts);
  // }

  openDialog(event: any, title?:string){
    // console.log("The current title is in dialog", this.currentPost.title);
    this.dialogRef.open(PopUpComponent,{
    });
    this.data.deleteTitle(title!);
  }

  deletePost(post: Post) {
    const dialog = this.dialogRef.open(PopUpComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.postService.deletePost(post.id).subscribe(
          (response) => {
            console.log("deleting post: "+response);
            this.posts = this.posts.filter(p => p.id !== post.id);
          },
          (error) => {
            console.log("Error deleting post ", error);
          }
          );
      }
    });
    this.router.navigate(['homepage-posts']);
  }

  counter: number = 0;

  showComments(event:any){
    this.seeComments=!this.seeComments;
  }
  incrementCounter(event:any){
    this.likes += (this.isActive) ? -1 : 1;
		this.isActive = !this.isActive;
  }

  toggleLike() {
    // const likeAction = this.isLiked ? 'unlike' : 'like';
    if(this.isLiked){
      // Unlike the post
      this.postService.likePost(this.currentPost.id).subscribe(
        (response) => {
          console.log("Unliking post: ", response);
          this.currentPost.likes -= 1;
          this.isLiked = false;
        }
      );
    } else {
      // Like the post
      this.postService.likePost(this.currentPost.id).subscribe(
        (response) => {
          console.log("Liking post: ", response);
          this.currentPost.likes += 1;
          this.isLiked = true;
        }
      );
    }
    // this.postService.likePost(this.currentPost.id, likeAction).subscribe(
    //   (response) => {
    //   this.currentPost.likes += (this.isActive) ? -1 : 1;
    // });
  }
}
