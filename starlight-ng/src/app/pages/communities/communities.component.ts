import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css']
})
export class CommunitiesComponent {
  communityType:string="";
  public postList?: Post[];
  public postListTagged?: Post[];
  

  constructor(private data: DataService){}
  ngOnInit(){
    this.data.currentListPosts.subscribe(
      pList=>this.postList= pList
      );

    this.data.currentCommunityTag.subscribe(
      community=>this.communityType= community
    );
    this.data.currentListTaggedPosts.subscribe(
      pList=>this.postListTagged= pList
      );
    console.log("The current tag is: ", this.communityType)
  }



}
