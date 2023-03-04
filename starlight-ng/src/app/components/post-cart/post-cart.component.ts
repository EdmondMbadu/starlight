import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.css']
})
export class PostCartComponent {


  @Input() title: string = '';
  @Output() click = new EventEmitter<MouseEvent>();
}
