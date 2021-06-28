import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges
} from '@angular/core';
import { EntitiesService } from '../../../services/entities.service';
import { ActivatedRoute } from '@angular/router';
import {
  NotificationService,
  NotificationType
} from '../../../services/notification.service';
import { environment } from 'src/environments/environment';
// tslint:disable-next-line: nx-enforce-module-boundaries


@Component({
  selector: 'Smartcodehub-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent implements OnInit, OnChanges {
  @Input() CurrentEntity;
  ngOnChanges() {
    if (this.CurrentEntity)
      if (this.CurrentEntity.authEntity) {
        this.isAuthEntityPresent = true;
        this.authEntity = this.secureEntities.filter(
          a => a.name == this.CurrentEntity.authEntity.entityName
        )[0];
        this.isAuthEntityPresent = true;
      }
  }
  DownloadUrl: string;
  secureEntities: any[] = [];
  constructor(
    private entitiesService: EntitiesService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}
  isAuthEntityPresent = false;
  authEntity: any;
  ngOnInit() {
    this.entitiesService.userhassecureentity().subscribe(a => {
      const allentity = a;
      this.secureEntities = a.filter(a => a.authPayLoads);
    });
  }
  GetDownLoadUrl() {
    this.DownloadUrl = '';
    if (this.authEntity) {
      this.CurrentEntity.authEntity = {
        entityId: this.authEntity._id,
        entityName: this.authEntity.name,
        tokenPayloads: this.authEntity.authPayLoads.tokenPayloads
      };
    }
    this.entitiesService.GetOnlyDownLoadLink(this.CurrentEntity).subscribe(
      a => {
        `${environment.url}${a.url}`;
        this.DownloadUrl = `${environment.url}${a.url}`;
      },
      err => {
        this.notificationService.showNotification(
          NotificationType.warn,
          err.message.name ? err.message.name : 'Please try after some time'
        );
      }
    );
  }
}
