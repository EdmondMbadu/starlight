import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor (private router:Router, private data: DataService){}

  @Input() title: string = '';
  @Input() icon:string='';
  @Input() path:string="";
  @Input() prefix:string="";
  @Output()messageEvent= new EventEmitter();
  communities:boolean=false;
  communityType:string="";


  ngOnInit(){
    this.data.currentCommunityTag.subscribe(
      community=>this.communityType= community
    );

  }

  communityList:string[]=[
    "Fantasy",
    "Commedy",
    "Fiction",
    "Horror",
    "Romance",
    "Adventure"
  ];

  displayCommunities(event:any){
    this.communities=!this.communities;
    this.router.navigate(['communities']);


  }

  sendCommunityTag(event:string){
    this.data.updateCommunityTag(event);
    this.prefix = event.toUpperCase();
    this.messageEvent.emit(event);
 
    this.router.navigate(['communities']);
    // this.router.navigate(['homepage-posts']);


    

  }
}
