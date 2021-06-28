import { Component, OnInit, Input } from '@angular/core';
import { EntitiesService } from '../../../services/entities.service';

import { environment } from 'src/environments/environment';
// tslint:disable-next-line: nx-enforce-module-boundaries


@Component({
  selector: 'Smartcodehub-secure-entity',
  templateUrl: './secure-entity.component.html',
  styleUrls: ['./secure-entity.component.scss']
})
export class SecureEntityComponent implements OnInit {
  @Input() CurrentEntity: any;
  @Input() drawer: any;
  DownloadUrl: string;
  panelOpenState:boolean;
  GetDownLoadUrl() {
    if (
      this.CurrentEntity.authPayLoads.reqPayLoads.length &&
      this.CurrentEntity.authPayLoads.tokenPayloads.length
    ) {
      this.entityService.CreateAuthUrl(this.CurrentEntity).subscribe(a => {
        this.DownloadUrl = `${environment.url}${a.url}`;
      });
    }
  }
  constructor(private entityService: EntitiesService) {}

  ngOnInit() {
    this.CurrentEntity.authPayLoads = this.CurrentEntity.authPayLoads
      ? this.CurrentEntity.authPayLoads
      : {
          reqPayLoads: [],
          tokenPayloads: []
        };
  }
}
