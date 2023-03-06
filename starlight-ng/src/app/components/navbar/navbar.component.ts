import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  constructor (private router:Router){}

  @Input() title: string = '';
  @Input() icon:string='';
  @Input() path:string='';
  // @Input() toggleTarget: string = '';

  goToHome(event: any){
    this.router.navigate(['homepage-posts']);
  }

  createNewPost(event:any){
    this.router.navigate(['new-post']);
  }

  goToCommunities(event:any){
    this.router.navigate(['communities']);
  }
}
