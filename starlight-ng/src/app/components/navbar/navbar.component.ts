import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  public postList: Post[];
  post: Post;

  @Input() title: string = '';
  @Input() icon:string='';
  @Input() path:string="";
  @Input() prefix:string="";
  @Output()messageEvent= new EventEmitter();
  communities:boolean=false;
  communityType:string="";
  communityList:string[];
  constructor (private router:Router, private data: DataService){
    this.communityList= data.communityList;
    this.post= new Post();
    this.postList=[this.post];

  }
  ngOnInit(){
    this.data.currentCommunityTag.subscribe(
      community=>this.communityType= community
    );
    this.data.currentListPosts.subscribe(
      pList=>this.postList= pList
      );
  }

  
  gotoHome(){
    this.resetTag();
    this.router.navigate(['homepage-posts']);
  }
  goToNewPost(){
    this.router.navigate(['new-post']);
  }

  displayCommunities(event:any){
    this.resetTag();
    this.communities=!this.communities;
    this.router.navigate(['communities']);
  }
  resetTag(){
    this.data.updateCommunityTag("");
  }

  sendCommunityTag(tag:string){

    this.data.updateCommunityTag(tag);
    this.filterTag(tag);
    this.prefix = tag.toUpperCase();
    this.router.navigate(['communities']);
  }

  filterTag(tag:string){
   let result = this.postList.filter( cp=> cp.label===tag);
   this.data.updatePostListTagged(result);
  }

  
}
