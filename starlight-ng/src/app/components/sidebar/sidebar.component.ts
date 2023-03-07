import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor (private router:Router){}

  gotoHome(event: any){
    this.router.navigate(['homepage-posts']);

  }
  createNewPost(event:any){
    this.router.navigate(['new-post']);

  }
  goToCommunities(event:any){

    this.router.navigate(['communities']);
  }
  currentTab(event:any){
    console.log("The current tab is",event);

  }
}
