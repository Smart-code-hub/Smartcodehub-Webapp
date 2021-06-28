import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EntitiesService {
  constructor(private http: HttpClient) {}
  private entitySubject = new BehaviorSubject<any>({
    properties: [],
    _id: "",
    entitySchema: {},
    entitymodel: {},
    name: "",
    language: 2,
    htmlElement: "0"
  });
  entity$: Observable<any> = this.entitySubject.asObservable();

  private entitylistSubject = new BehaviorSubject<any[]>([]);
  entities$: Observable<any[]> = this.entitylistSubject.asObservable();

  private currentPropertySubject = new BehaviorSubject<Prop>(
    this.InitializeProperty()
  );
  currentProperty$: Observable<
    Prop
  > = this.currentPropertySubject.asObservable();
  deleteAll(ids: any[]) {
    return this.http.post<any>(`${environment.url}api/entities/DeleteAll`, {
      ids: ids
    });
  }
  GenerateMultipleResourses(params) {
    
    return this.http.post<any>(
      `${environment.url}api/entities/GetmultipleResourses`,
      { entityList: params.list,
      metaData: params.metaData}
    );
  }
  GetAllEntities() {
    this.http
      .get<any[]>(`${environment.url}api/entities/GetBuUserId`)
      .subscribe(a => this.entitylistSubject.next(a));
  }
  userhassecureentity() {
    return this.http.get<any[]>(`${environment.url}api/entities/GetBuUserId`);
  }
  CreateAuthUrl(CurrentEntity: any) {
    return this.http.post<any>(
      `${environment.url}api/entities/CreateSecureEntitiy`,
      CurrentEntity
    );
  }
  GetDownLoadLink(obj: any, entityToBeUpdated: boolean) {
    return entityToBeUpdated
      ? this.http.put<any>(`${environment.url}api/entities/${obj._id}`, obj)
      : this.http.post<any>(`${environment.url}api/entities/`, obj);
  }
  GetOnlyDownLoadLink(obj: any) {
    return this.http.post<any>(
      `${environment.url}api/entities/GetResoursesByEntity`,
      obj
    );
  }
  GetEntityById(arg0: any) {
    return this.http.get<any>(`${environment.url}api/entities/${arg0}`);
  }
  deleteEntity(_id: any) {
    return this.http.delete<any>(`${environment.url}api/entities/${_id}`);
  }
  updateEntity(obj: any) {
    return this.http.put<any>(`${environment.url}api/entities/${obj._id}`, obj);
  }
  constructSchema(prop) {
    let obj = {};
    prop.forEach(a => {
      obj[a.name] = a.value;
    });
    return obj;
  }

  UpdateEntity(entity) {
    this.entitySubject.next(entity);
  }
  ResetEntity() {
    this.entitySubject.next({
      properties: [],
      _id: "",
      entitySchema: {},
      entitymodel: {},
      name: "",
      language: 2
    });
  }
  UpdateCurrentProperty(property) {
    this.currentPropertySubject.next(property);
  }
  InitializeProperty() {
    return {
      _id: "",
      isHash: false,
      isImage: false,
      isRichText: false,
      name: "",
      htmlElement: "",
      type: "String",
      hasRelationShip: false,
      ref: { columnNameToDisplay: "", entityName: "", columnNameAsValue: "" },
      commonProperty: {
        required: { type: datatype.bool, default: false },
        default: { type: datatype.string, default: "" },
        select: { type: datatype.bool, default: false },
        alias: { type: datatype.string, default: "" }
      },
      indexProperty: {
        index: { type: datatype.bool, default: false },
        unique: { type: datatype.bool, default: false },
        sparse: { type: datatype.bool, default: false }
      },
      specificProperty: {
        minlength: { type: datatype.string, default: "" },
        maxlength: { type: datatype.string, default: "" },
        lowercase: { type: datatype.bool, default: false },
        uppercase: { type: datatype.bool, default: false },
        trim: { type: datatype.bool, default: false },
        match: { type: datatype.bool, default: false }
      }
    };
  }
}

export enum datatype {
  bool,
  string,
  number,
  any,
  array,
  date
}
export interface Prop {
  isImage: boolean;
  isRichText: boolean;
  name: String;
  type: string;
  specificProperty: any;
  indexProperty: any;
  commonProperty: any;
  hasRelationShip: boolean;
  ref?: {
    entityName: string;
    columnNameToDisplay: string;
    columnNameAsValue: string;
  };
}
