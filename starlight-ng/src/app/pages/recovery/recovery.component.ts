import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  constructor(private router: Router) {}
  
  recover(event: any) {
    this.router.navigate(['change-password']);
  }

}
