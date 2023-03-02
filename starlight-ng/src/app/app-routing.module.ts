import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HomepagePostsComponent } from './pages/homepage-posts/homepage-posts.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { CommunitiesComponent } from './pages/communities/communities.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recovery',
    component: RecoveryComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path:'homepage-posts',
    component:HomepagePostsComponent,
  },
  {
    path:'new-post',
    component: NewPostComponent,
  },
  {
    path:'communities',
    component:CommunitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
