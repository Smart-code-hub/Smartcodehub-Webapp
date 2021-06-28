import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface FrameworkData {
  frontend: string;
  backend: string;
  serverless: string;
}
@Component({
  selector: 'app-entitiy-framework',
  templateUrl: './entitiy-framework.component.html',
  styleUrls: ['./entitiy-framework.component.scss']
})
export class EntitiyFrameworkComponent implements OnInit {
  
  newMetaDataType: FrameworkData = {
    backend: '' ,frontend: '', 
    serverless: ''
  }
  
  onServerLessChange() {
    this.newMetaDataType.backend = null;
    this.newMetaDataType.frontend = null;

  }
  onFullStackChange() {
    this.newMetaDataType.serverless = null;

  }
  constructor(
    public dialogRef: MatDialogRef<EntitiyFrameworkComponent>,
    ) {}

  onNoClick(): void {
    this.dialogRef.close(this.newMetaDataType);
  }

  ngOnInit() {

  }

}
