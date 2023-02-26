import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavelementsComponent } from './components/navelements/navelements.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: '',
    component: NavelementsComponent,
    outlet: "navelements",
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: '',
  //   component: AppComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
