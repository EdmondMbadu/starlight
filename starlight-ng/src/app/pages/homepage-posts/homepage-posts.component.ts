import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { PostService } from 'src/app/services/post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-homepage-posts',
  templateUrl: './homepage-posts.component.html',
  styleUrls: ['./homepage-posts.component.css']
})
export class HomepagePostsComponent {


  public postList?: Post[];
  posts?:Post[];

  constructor(private data: DataService, private authService: AuthService, private postService:PostService, private datePipe: DatePipe){ 
  }

  getData() {
    this.authService.getData().subscribe(data => console.log(data));
  }

  ngOnInit(){
    // this.data.currentListPosts.subscribe(
    //   pList=>this.postList= pList
    // );

    this.postService.getUserPosts().subscribe(
      (response: Post[]) => {
        console.log("getUserPosts returns: " + response[0].id);
        this.posts = response.map(post => ({
          ...post,
          created_at: this.datePipe.transform(post.created_at, 'MM/dd/yyyy')
        }));
      },
      (error) => {
        console.log("error retrieving posts: ", error);
      }
    )
  }


}
