import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureEntityComponent } from './secure-entity.component';

describe('SecureEntityComponent', () => {
  let component: SecureEntityComponent;
  let fixture: ComponentFixture<SecureEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
