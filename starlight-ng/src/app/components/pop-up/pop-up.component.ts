import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {

  constructor (private router:Router){}

  goToHome(event: any){
    this.router.navigate(['homepage-posts']);
  }

  deletePost(event: any){
    this.router.navigate(['homepage-posts']);
  }

}