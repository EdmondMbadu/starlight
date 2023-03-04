import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { GreenbtnComponent } from './components/greenbtn/greenbtn.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
<<<<<<< HEAD
=======
import { HomepagePostsComponent } from './pages/homepage-posts/homepage-posts.component';
import { PostCartComponent } from './components/post-cart/post-cart.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
>>>>>>> origin/edmon-changes
import { CommunitiesComponent } from './pages/communities/communities.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    GreenbtnComponent,
    NavbarComponent,
    RegistrationComponent,
    RecoveryComponent,
    ChangePasswordComponent,
<<<<<<< HEAD
=======
    HomepagePostsComponent,
    PostCartComponent,
    SidebarComponent,
    NewPostComponent,
>>>>>>> origin/edmon-changes
    CommunitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
