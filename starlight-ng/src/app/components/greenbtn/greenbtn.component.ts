import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greenbtn',
  templateUrl: './greenbtn.component.html',
  styleUrls: ['./greenbtn.component.css']
})
export class GreenbtnComponent {
  @Input() buttonName: string = ''
}
