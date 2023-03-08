import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.css']
})
export class PostCartComponent {
  communityType:string="Essay";

  constructor(private data: DataService){}
  ngOnInit(){
this.data.currentCommunityTag.subscribe(
  community=>this.communityType= community
);
  }
  

  @Input() title: string = '';

  counter: number =0;
  seeComments:boolean=false;


  showComments(event:any){
    this.seeComments=!this.seeComments;
  }
  incrementCounter(event:any){
    this.counter++;
  }
}
