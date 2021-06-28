import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Smartcodehub-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  panelOpenState = false;
  constructor() {}
  MenuItems = [
    {
      name: 'Entities',
      items: [
        { name: 'Models', icon: 'create_new_folder', path: '/entities/list' },
        {
          name: 'Create Model',
          icon: 'cloud_download',
          path: '/entities/create'
        }
      ]
    }
  ];
  ngOnInit() {}
}
