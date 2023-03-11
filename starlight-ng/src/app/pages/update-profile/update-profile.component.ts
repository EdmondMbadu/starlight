import { Component, Input, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// classes
import { User } from 'src/app/models/user';
// services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user: User = new User;
  message: string ="";
  @Input() url: string | ArrayBuffer | null | undefined;
Update: any;


  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.getUser();
	}

	// getUser(userId: number): void {
	getUser(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        console.log("gerUserData return: ", this.user);
      }
    )
	}
	
  
  goToHome() {
    this.router.navigate(['homepage-posts']);
  }

  updateProfile() {
    this.userService.updateUser(this.user).subscribe(
      (response:any) => {
        console.log(response);
        this.user = response;
        // alert('Profile updated successfully');
        this.message = "Profile updated successfully!";
        this.router.navigate(['update-profile']);
      },
      (error:any) => {
        console.log('Update failed: ', error)
      }
    );
  }
  // updateProfile(): void {		
	// 	this.userService.updateUser(this.user).subscribe(success=> {this.goBack();});
	// }

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
