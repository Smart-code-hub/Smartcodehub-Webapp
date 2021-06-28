import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EntitiesService } from '../../services/entities.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import {
  NotificationService,
  NotificationType
} from '../../services/notification.service';
import { environment } from 'src/environments/environment';
import { EntitiyFrameworkComponent } from './entitiy-framework/entitiy-framework.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'Smartcodehub-entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.css']
})
export class EntitiesListComponent implements OnInit {
  DownloadUrl: string;
  panelOpenState: any;
  constructor(
    private notifyService: NotificationService,
    private entityService: EntitiesService,
    public dialog: MatDialog
  ) { }
  dataSource: MatTableDataSource<any>;
  CurrentEntity: any;
  showSecureEntityComponent = false;
  entities$: Observable<any[]>;
  List = [];
  CheckIfPasswordExists(entity) {
    return entity.properties.some(a =>
      a.name.toLowerCase().includes('password')
    );
  }
  GetPropertiesofEntity(item: any) {
    return item.properties.map(a => a.name).join(', ');
  }
  DeleteEntity(entity) {
    this.entityService.deleteEntity(entity._id).subscribe(a => {
      this.entityService.GetAllEntities();
      this.notifyService.showNotification(
        NotificationType.success,
        'Record deleted'
      );
    });
  }
  DeleteinBulk() {
    this.entityService.deleteAll(this.List.map(a => a._id)).subscribe(a => {
      this.entityService.GetAllEntities();
      this.notifyService.showNotification(
        NotificationType.success,
        'Selected records are deleted'
      );
    });
  }
  GenerateResourses() {


    const dialogRef = this.dialog.open(EntitiyFrameworkComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.entityService.GenerateMultipleResourses({
        list: this.List, metaData: {
            frontEndType: result.frontend,
            backEndType: result.backend,
            serverLessType: result.serverless
   }
      }).subscribe(
        a => {
          this.DownloadUrl = `${environment.url}${a.url}`;
        },
        error => {
          this.notifyService.showNotification(
            NotificationType.error,
            error.error.message
          );
        }
      );
    });
  }
  ngOnInit() {
    this.entityService.GetAllEntities();
    this.entities$ = this.entityService.entities$;
  }

  addToList(e, item) {
    if (!e.checked) {
      this.List = this.List.filter(a => a._id != item._id);
    } else {
      this.List.push(item);
    }
  }
}

/** Builds and returns a new User. */
