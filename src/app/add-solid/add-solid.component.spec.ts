import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolidComponent } from './add-solid.component';

describe('AddSolidComponent', () => {
  let component: AddSolidComponent;
  let fixture: ComponentFixture<AddSolidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSolidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
