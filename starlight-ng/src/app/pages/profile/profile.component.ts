import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() url: string | ArrayBuffer | null | undefined;

  constructor (private router:Router){}

  cancelAction(event: any){
    this.router.navigate(['homepage-posts']);
  }

  updateProfile(event: any){
    this.router.navigate(['profile']);
  }

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if(event.target) {
          this.url = event.target.result;
        }
      }
    }
  }
}
