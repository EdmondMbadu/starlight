import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  @Input() title: string = '';
  @Input() icon:string='';
  @Input() path:string="";
  communities:boolean=false;

  displayCommunities(event:any){
    this.communities=!this.communities;

  }
}
