import { Component, OnInit, Inject } from "@angular/core";
import {
  EntitiesService,
  Prop,
  datatype
} from "../../../services/entities.service";
import { isEmpty } from "lodash";
import {
  NotificationService,
  NotificationType
} from "../../../services/notification.service";
import { element } from "protractor";

@Component({
  selector: "Smartcodehub-properties",
  templateUrl: "./properties.component.html",
  styleUrls: ["./properties.component.scss"]
})
export class PropertiesComponent implements OnInit {
  constructor(
    private entitiesService: EntitiesService,
    private notificationService: NotificationService
  ) {}

  typeproperty = {
    String: {
      minlength: { type: datatype.string, default: "" },
      maxlength: { type: datatype.string, default: "" },
      lowercase: { type: datatype.bool, default: false },
      uppercase: { type: datatype.bool, default: false },
      trim: { type: datatype.bool, default: false }
      // match: { type: datatype.bool, default: false }
    },
    Number: {
      min: { type: datatype.string, default: "" },
      max: { type: datatype.string, default: "" }
    },
    Date: {
      min: { type: datatype.date, default: "" },
      max: { type: datatype.date, default: "" }
    }
  };

  property: Prop;

  entity: any;

  types: string[] = [
    "String",
    "Number",
    "Date",
    "Buffer",
    "Boolean",
    "Mixed",
    "ObjectId",
    "Array",
    "Decimal128",
    "Map"
  ];

  ChangeType(val) {
    console.log(val);

    this.typeproperty[val]
      ? (this.property.specificProperty = this.typeproperty[val])
      : undefined;
  }
  onImageSlideToggle(event) {
    this.property.isImage = event.checked;
    this.property.type = this.property.isImage ? "Array" : "String";
  }
  UpdateEntity() {
    console.log(this.property);

    this.entity.properties.forEach(element => {
      if (element.name == this.property.name) {
        element = this.property;
      }
    });

    this.notificationService.showNotification(
      NotificationType.warn,
      "Property Updated"
    );
  }
  entities: any;
  columns = [];
  onrefEntityChange(name) {
    console.log("Inside the dunction");

    const refEntity = this.entities.find(a => a.name == name);
    this.columns = refEntity.properties.map(a => a.name);
  }

  ngOnInit() {
    this.entitiesService.GetAllEntities();
    this.entitiesService.entities$.subscribe(a => {
      this.entities = a;
    });
    this.entitiesService.entity$.subscribe(a => (this.entity = a));
    this.entitiesService.currentProperty$.subscribe(a => {
      this.property = a;
    });
  }
}
