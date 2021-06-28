import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Route } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './Shared/sidenav/sidenav.component';
import { SecurityGuard } from './guards/security.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthInterceptService } from './services/auth-intercept.service';
//import { PlyrModule } from 'ngx-plyr';

import { environment } from '../environments/environment';
import { SharedComponentsModule } from './Shared/shared-components.module';
const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [SecurityGuard]
  },
  {
    path: 'security',

    loadChildren: () =>
      import('./security/security.module').then(a => a.SecurityModule)
  },
  {
    path: 'entities',
    loadChildren: () =>
      import('./entities/entities.module').then(a => a.EntitiesModule)
  }
];
@NgModule({
  declarations: [AppComponent, DashboardComponent, SidenavComponent],
  imports: [
   // PlyrModule,
    BrowserModule,
    HttpClientModule,
    MatExpansionModule,
    SharedComponentsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
