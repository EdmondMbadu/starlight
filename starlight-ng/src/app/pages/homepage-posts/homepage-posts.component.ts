import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-homepage-posts',
  templateUrl: './homepage-posts.component.html',
  styleUrls: ['./homepage-posts.component.css']
})
export class HomepagePostsComponent {


  public postList?: Post[];

  constructor(private data: DataService){ 
  }

  ngOnInit(){
    this.data.currentListPosts.subscribe(
      pList=>this.postList= pList
      );

  }


}
