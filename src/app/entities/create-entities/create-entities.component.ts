import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PropertiesComponent } from "./properties/properties.component";

import { MatSidenav } from "@angular/material/sidenav";

import { stringify } from "@angular/compiler/src/util";

import {
  NotificationService,
  NotificationType
} from "../../services/notification.service";
import { EntitiesService } from "../../services/entities.service";

import { ActivatedRoute, Router } from "@angular/router";
import { isNgTemplate } from "@angular/compiler";

@Component({
  selector: "Smartcodehub-create-entities",
  templateUrl: "./create-entities.component.html",
  styleUrls: ["./create-entities.component.scss"]
})
export class CreateEntitiesComponent implements OnInit {
  constructor(
    private router: Router,
    private entitiesService: EntitiesService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}
  @ViewChild("sidenav", { static: true }) public sidenav: MatSidenav;
  user: any;
  animal: string;
  name: string;
  entity: any;
  authEntity: any;
  DownloadUrl: string;
  EntityToBeUpdated = false;
  isAuthEntityPresent = false;
  secureEntities: any[] = [];

  HTMLElements = ["Select", "Radio", "Image", "Pre", "Input", "Textarea"];
  removeProperty(i) {
    this.entity.properties.splice(i, 1);
  }
  UpdateEntity() {
    this.DownloadUrl = "";
    if (this.authEntity) {
      this.entity.authEntity = {
        entityId: this.authEntity._id,
        entityName: this.authEntity.name,
        tokenPayloads: this.authEntity.authPayLoads.tokenPayloads
      };
    }
    this.entitiesService
      .GetDownLoadLink(this.entity, this.EntityToBeUpdated)
      .subscribe(
        a => {
          this.router.navigateByUrl("/entities/list");
          //  this.DownloadUrl = `${environment.url}${a.url}`;
          this.entitiesService.UpdateEntity({
            properties: [],
            name: "",
            language: 2
          });
        },
        err => {
          this.notificationService.showNotification(
            NotificationType.warn,
            err.message.name ? err.message.name : "Table already Created"
          );
        }
      );
  }
  GetPropName() {
    return this.entity.properties.map(a => a.name);
  }
  addProperty() {
    const prop = this.entitiesService.InitializeProperty();

    this.entity.properties.push(prop);
  }
  UpdateCurrentProperty(name) {
    this.entitiesService.UpdateCurrentProperty(name);
  }
  ngOnInit() {
    this.entitiesService.userhassecureentity().subscribe(a => {
      const allentity = a;
      this.secureEntities = a.filter(a => a.authPayLoads);
    });
    this.route.params.subscribe(a => {
      if (a["id"]) {
        this.EntityToBeUpdated = true;
        this.entitiesService
          .GetEntityById(a["id"])
          .subscribe(a => (this.entity = a));
      } else {
        this.entitiesService.entity$.subscribe(a => (this.entity = a));
      }
    });
  }

  selectHtmlElement(event) {}
}
