import { Component, Input,  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  @Input() url: string | ArrayBuffer | null | undefined;
Update: any;

  constructor(private router: Router) {}
  
  goToHome(event: any) {
    this.router.navigate(['homepage-posts']);
  }

  updateProfile(event: any) {
    this.router.navigate(['update-profile']);
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
