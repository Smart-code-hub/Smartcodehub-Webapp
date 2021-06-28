import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiyFrameworkComponent } from './entitiy-framework.component';

describe('EntitiyFrameworkComponent', () => {
  let component: EntitiyFrameworkComponent;
  let fixture: ComponentFixture<EntitiyFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiyFrameworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiyFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
