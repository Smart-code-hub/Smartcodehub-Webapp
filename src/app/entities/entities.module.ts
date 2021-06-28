import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { EntitiesListComponent } from './entities-list/entities-list.component';
import { CreateEntitiesComponent } from './create-entities/create-entities.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { PropertiesComponent } from './create-entities/properties/properties.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EntityDetailComponent } from './entities-list/entity-detail/entity-detail.component';
import { SecureEntityComponent } from './entities-list/secure-entity/secure-entity.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EntitiyFrameworkComponent } from './entities-list/entitiy-framework/entitiy-framework.component';
import {  MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: 'create', component: CreateEntitiesComponent },
  { path: 'update/:id', component: CreateEntitiesComponent },
  { path: 'list', component: EntitiesListComponent }
];
@NgModule({
  declarations: [
    EntitiesListComponent,
    CreateEntitiesComponent,
    PropertiesComponent,
    EntityDetailComponent,
    SecureEntityComponent,
    EntitiyFrameworkComponent
  ],
  providers: [MatDatepickerModule],
  imports: [
    MatCheckboxModule,
    RouterModule.forChild(routes),
    MatNativeDateModule,
    MatTooltipModule,
    CommonModule,
    MatExpansionModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSidenavModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ]
})
export class EntitiesModule {
  /**
   *
   */
  constructor() {}
}
