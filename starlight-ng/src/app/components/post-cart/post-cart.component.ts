import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.css']
})
export class PostCartComponent {

  @Input() currentPost: Post;

  title: string = '';
  isLiked:boolean = false;
  likes: number =0;
  seeComments:boolean=false;
  user: User;
  posts: Post[];
  post: Post;
  
  constructor(
    private data: DataService, 
    private dialogRef : MatDialog,
    private userService: UserService, 
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.post= new Post();
    this.user = new User();
    this.posts = [];
    this.currentPost = new Post();
  }

  ngOnInit(){
    this.getUser();

    this.getPostLikes();

    console.log("currentPost created_at = " + this.currentPost.created_at);
    this.currentPost.created_at = this.datePipe.transform(this.currentPost.created_at, 'MM/dd/yyyy');
  }

  getUser(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
      }
    )
	}

  getPost(): void {
    this.route.params.subscribe(params => {
      const postId = params['id'];
      this.postService.getPost(postId).subscribe(post => {
        this.currentPost = post;
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
        window.location.reload();
      }
    });
  }

  showComments(event:any){
    this.seeComments=!this.seeComments;
  }

  toggleLike() {
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
  }
}
