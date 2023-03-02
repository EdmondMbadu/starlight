import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-greenbtn',
  templateUrl: './greenbtn.component.html',
  styleUrls: ['./greenbtn.component.css']
})
export class GreenbtnComponent {
  @Input() buttonName: string = '';
  @Output() click = new EventEmitter<MouseEvent>();

  onClickButton(event: MouseEvent) {
    this.click.emit(event);
  }
}
