import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingComponent } from './app-routing.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from '../home/welcome.component';
import { PageNotFoundComponent } from '../page-not-found.component';

const appRoutes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: [AppRoutingComponent]
})
export class AppRoutingModule { }
