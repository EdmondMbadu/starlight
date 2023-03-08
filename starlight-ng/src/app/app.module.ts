import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastModule } from '@coreui/angular';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditorModule } from '@tinymce/tinymce-angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { GreenbtnComponent } from './components/greenbtn/greenbtn.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HomepagePostsComponent } from './pages/homepage-posts/homepage-posts.component';
import { PostCartComponent } from './components/post-cart/post-cart.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { CommunitiesComponent } from './pages/communities/communities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    HomepagePostsComponent,
    PostCartComponent,
    SidebarComponent,
    NewPostComponent,
    CommunitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
