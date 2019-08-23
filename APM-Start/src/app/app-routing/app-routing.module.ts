import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingComponent } from './app-routing.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { WelcomeComponent } from '../home/welcome.component';
import { PageNotFoundComponent } from '../page-not-found.component';
import { AuthGuard } from '../user/auth.guard';
import { SelectiveLoadStrategyService } from '../selective-load-strategy.service';

const appRoutes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'products',
    // canLoad: [AuthGuard], prevents preloading
    canActivate: [AuthGuard],
    data: {preload: true},
    loadChildren: () =>
    import('../products/product.module')
      .then(m => m.ProductModule)},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,
      {preloadingStrategy: SelectiveLoadStrategyService, enableTracing: false})
  ],
  exports: [RouterModule],
  declarations: [AppRoutingComponent]
})
export class AppRoutingModule { }
